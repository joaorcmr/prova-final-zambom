import { Module } from '@nestjs/common';
import { useClass } from '../../helpers/use-class.helper';
import { FIREBASE_SERVICE } from './firebase-service.interface';
import { FirebaseService } from './firebase.service';
import { EnvServiceModule } from '../env/env-service.module';
import { LoggerServiceModule } from '../logger/logger-service.module';

@Module({
  imports: [EnvServiceModule, LoggerServiceModule],
  providers: [useClass(FIREBASE_SERVICE, FirebaseService)],
  exports: [FIREBASE_SERVICE],
})
export class FirebaseServiceModule {}
