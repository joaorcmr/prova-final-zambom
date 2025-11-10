import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Request } from 'express';
import {
  FIREBASE_SERVICE,
  IFirebaseService,
  FirebaseUser,
} from '../services/firebase/firebase-service.interface';
import {
  ILoggerService,
  LOGGER_SERVICE,
} from '../services/logger/logger-service.interface';

// Estende a interface Request do Express para incluir o usuário
declare global {
  namespace Express {
    interface Request {
      user?: FirebaseUser;
    }
  }
}

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    @Inject(FIREBASE_SERVICE)
    private readonly firebaseService: IFirebaseService,
    @Inject(LOGGER_SERVICE) private readonly logger: ILoggerService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    try {
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        this.logger.warn('No Firebase token found in request headers');
        throw new UnauthorizedException('Token not provided');
      }

      // Verifica e decodifica o token Firebase
      const user = await this.firebaseService.verifyIdToken(token);

      // Adiciona o usuário ao request para uso posterior
      request.user = user;

      this.logger.info('User authenticated successfully', { uid: user.uid });
      return true;
    } catch (error) {
      this.logger.error('Authentication failed', {
        error: error.message,
        path: request.path,
        method: request.method,
      });

      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new UnauthorizedException('Authentication failed');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // Busca o token no header Authorization no formato: Bearer <token>
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
