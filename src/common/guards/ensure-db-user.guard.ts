import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import {
  ILoggerService,
  LOGGER_SERVICE,
} from '../services/logger/logger-service.interface';
import {
  USER_REPOSITORY,
  IUserRepository,
} from '../repositories/user/user-repository.interface';

@Injectable()
export class EnsureDbUserGuard implements CanActivate {
  constructor(
    @Inject(LOGGER_SERVICE) private readonly logger: ILoggerService,
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const firebaseUser = request.user;

    // If there's no authenticated user on request, skip silently
    if (!firebaseUser?.uid) {
      return true;
    }

    try {
      const existing = await this.userRepository.findOne({
        firebaseUid: firebaseUser.uid,
      });
      if (!existing) {
        await this.userRepository.create({ firebaseUid: firebaseUser.uid });
        this.logger.info('ensureDbUser.created', { uid: firebaseUser.uid });
      }
    } catch (error) {
      // Ignore unique violations from race conditions
      this.logger.warn('ensureDbUser.checkOrCreate.warning', { error });
    }

    return true;
  }
}
