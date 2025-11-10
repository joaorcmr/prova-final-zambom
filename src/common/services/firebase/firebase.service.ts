import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/auth';
import { FirebaseUser, IFirebaseService } from './firebase-service.interface';
import { ENV_SERVICE, IEnvService } from '../env/env-service.interface';
import {
  ILoggerService,
  LOGGER_SERVICE,
} from '../logger/logger-service.interface';

@Injectable()
export class FirebaseService implements IFirebaseService {
  private app: admin.app.App;

  constructor(
    @Inject(ENV_SERVICE) private readonly envService: IEnvService,
    @Inject(LOGGER_SERVICE) private readonly logger: ILoggerService,
  ) {
    this.initializeFirebase();
  }

  private initializeFirebase() {
    try {
      // Verifica se já existe uma app inicializada
      if (admin.apps.length === 0) {
        this.app = admin.initializeApp({
          credential: admin.credential.cert({
            projectId: this.envService.firebase.projectId,
            privateKey: this.envService.firebase.privateKey.replace(
              /\\n/g,
              '\n',
            ),
            clientEmail: this.envService.firebase.clientEmail,
          }),
          projectId: this.envService.firebase.projectId,
        });
        this.logger.info('Firebase Admin SDK initialized successfully');
      } else {
        this.app = admin.apps[0] as admin.app.App;
        this.logger.info('Using existing Firebase Admin SDK instance');
      }
    } catch (error) {
      this.logger.error('Error initializing Firebase Admin SDK', { error });
      throw error;
    }
  }

  async verifyIdToken(idToken: string): Promise<FirebaseUser> {
    try {
      this.logger.info('Verifying Firebase ID token');
      const decodedToken: DecodedIdToken = await admin
        .auth(this.app)
        .verifyIdToken(idToken);

      this.logger.info('Firebase ID token verified successfully', {
        uid: decodedToken.uid,
        email: decodedToken.email,
      });

      return this.mapDecodedTokenToFirebaseUser(decodedToken);
    } catch (error) {
      this.logger.error('Error verifying Firebase ID token', {
        error: error.message,
      });
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async getUserByUid(uid: string): Promise<FirebaseUser> {
    try {
      this.logger.info('Getting user by UID', { uid });
      const userRecord = await admin.auth(this.app).getUser(uid);

      return {
        uid: userRecord.uid,
        email: userRecord.email,
        name: userRecord.displayName,
        picture: userRecord.photoURL,
        emailVerified: userRecord.emailVerified,
        provider: userRecord.providerData[0]?.providerId || 'firebase',
      };
    } catch (error) {
      this.logger.error('Error getting user by UID', {
        uid,
        error: error.message,
      });
      throw new UnauthorizedException('User not found');
    }
  }

  private mapDecodedTokenToFirebaseUser(
    decodedToken: DecodedIdToken,
  ): FirebaseUser {
    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture,
      emailVerified: decodedToken.email_verified || false,
      provider: decodedToken.firebase.sign_in_provider || 'firebase',
    };
  }
}
