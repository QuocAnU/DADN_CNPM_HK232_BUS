import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DeviceService } from './device.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateAccessTokenDto } from './dto/updateAccessTokenDto';

@ApiTags("Devices")
@Controller('device')
export class DevicesController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get('token')
  async getAccessToken(
  ) {
    return await this.deviceService.getAccessToken()
  }

  @Post("token")
  async updatedAccessToken(@Body() dto: UpdateAccessTokenDto ) {
    return await this.deviceService.updateAccessToken(dto)
  }

  @Get('details') 
  async getDetails() {
    return await this.deviceService.fetchDeviceData()
  }
}
