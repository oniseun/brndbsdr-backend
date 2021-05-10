import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): object {
    return {
      success : true,
      message : "Hello there! I'm OK!"
    }
  }
}