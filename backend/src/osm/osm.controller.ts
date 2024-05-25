import { Controller, Get, Query } from '@nestjs/common';
import { OsmService } from './osm.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("MAPs")
@Controller('osm')
export class OsmController {
  constructor(private readonly osmService: OsmService) {}

  @Get('bus-stops')
  async getBusStops(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('radius') radius: number
  ) {
    return await this.osmService.fetchOSMBusStops(latitude, longitude, radius);
  }
}
