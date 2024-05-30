import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AdafruitService } from './device.service';
import { AdafruitController } from './device.controller';

@Module({
  imports: [],
  controllers: [AdafruitController],
  providers: [AdafruitService],
})
export class AdafruitModule {}
