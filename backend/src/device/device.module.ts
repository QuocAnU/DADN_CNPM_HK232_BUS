import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DeviceService } from './device.service';
import { DevicesController } from './device.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceSchema } from './entities/device.entities';

@Module({
  imports: [
    MongooseModule.forFeature([{
        name: Device.name,
        schema: DeviceSchema
    }])
  ],
  providers: [DeviceService],
  controllers: [DevicesController],
})
export class DeviceModule {}
