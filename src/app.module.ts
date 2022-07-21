import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckController } from './health-check/health-check.controller';

@Module({
  imports: [TerminusModule, ConfigModule],
  controllers: [AppController, HealthCheckController],
  providers: [AppService],
})
export class AppModule {}
