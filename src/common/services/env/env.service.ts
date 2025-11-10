import { ConfigService } from '@nestjs/config';
import { IEnvService } from './env-service.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvService implements IEnvService {
  api: {
    nodeEnv: string;
  };
  database: {
    host: string;
    port: number;
    name: string;
    username: string;
    password: string;
  };
  firebase: {
    projectId: string;
    privateKey: string;
    clientEmail: string;
  };
  constructor(private readonly _configService: ConfigService) {
    this.api = {
      nodeEnv:
        this._configService.get<string>('NODE_ENV') ||
        process.env.NODE_ENV ||
        'development',
    };
    const databaseUrl = _configService.get<string>('DATABASE_URL');
    if (databaseUrl) {
      const url = new URL(databaseUrl);
      this.database = {
        host: url.hostname,
        username: decodeURIComponent(url.username),
        password: decodeURIComponent(url.password),
        name: url.pathname.replace(/^\//, ''),
        port: Number(url.port || 5432),
      };
    } else {
      this.database = {
        host: _configService.getOrThrow<string>('DATABASE_HOST'),
        username: _configService.getOrThrow<string>('DATABASE_USERNAME'),
        password: _configService.getOrThrow<string>('DATABASE_PASSWORD'),
        name: _configService.getOrThrow<string>('DATABASE_NAME'),
        port: Number(_configService.getOrThrow<number>('DATABASE_PORT')),
      };
    }

    const firebaseProjectId = _configService.get<string>('FIREBASE_PROJECT_ID');
    const firebasePrivateKey = _configService.get<string>(
      'FIREBASE_PRIVATE_KEY',
    );
    const firebaseClientEmail = _configService.get<string>(
      'FIREBASE_CLIENT_EMAIL',
    );

    if (firebaseProjectId && firebasePrivateKey && firebaseClientEmail) {
      this.firebase = {
        projectId: firebaseProjectId,
        privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
        clientEmail: firebaseClientEmail,
      };
    } else {
      // Valores padrão quando Firebase não está configurado
      this.firebase = {
        projectId: '',
        privateKey: '',
        clientEmail: '',
      };
    }
  }
}
