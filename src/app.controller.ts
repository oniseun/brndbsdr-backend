import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Get()
  index():  object {
    return this.service.getHealth();
  }

  @Get('/health')
  getHealth(): object {
    return this.index()
  }
}
