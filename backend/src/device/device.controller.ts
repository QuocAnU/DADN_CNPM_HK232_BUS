import { Controller, Get, Param } from '@nestjs/common';
import { AdafruitService } from './device.service';

@Controller('adafruit')
export class AdafruitController {
  constructor(private readonly adafruitService: AdafruitService) {}

  @Get('/feed')
  async getLastData() {
    return this.adafruitService.getLastData();
  }
}
