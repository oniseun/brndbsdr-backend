import { Controller, Get } from '@nestjs/common';
import { Health } from '../models/health.model';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get()
  index(): Health {
    return this.service.getHealth();
  }

  @Get('/health')
  getHealth(): Health {
    return this.index();
  }
}
