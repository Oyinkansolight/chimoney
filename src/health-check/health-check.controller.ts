import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('health-check')
@Controller('health')
export class HealthCheckController {
  constructor(
    private healthCheckService: HealthCheckService,
    private http: HttpHealthIndicator,
    private configService: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  checkHealth() {
    return this.healthCheckService.check([
      () =>
        this.http.pingCheck(
          'Basic Check',
          this.configService.get<string>(
            'SERVER_HOST',
            'http://localhost:3000',
          ),
        ),
    ]);
  }
}
