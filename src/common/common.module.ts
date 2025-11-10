import { Module } from '@nestjs/common';
import { EnvServiceModule } from './services/env/env-service.module';
import { LoggerServiceModule } from './services/logger/logger-service.module';
import { FirebaseServiceModule } from './services/firebase/firebase-service.module';

@Module({
  imports: [EnvServiceModule, LoggerServiceModule, FirebaseServiceModule],
  exports: [EnvServiceModule, LoggerServiceModule, FirebaseServiceModule],
})
export class CommonModule {}
