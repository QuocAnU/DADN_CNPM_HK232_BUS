import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusStopsService } from './bus-stops.service';
import { CreateBusStopDto } from './dto/create-bus-stop.dto';
import { UpdateBusStopDto } from './dto/update-bus-stop.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("BusStops")
@Controller('bus-stop')
export class BusStopsController {
  constructor(private readonly busStopService: BusStopsService) {}

  @Post("create")
  async create(@Body() createBusStopDto: CreateBusStopDto) {
    try {
       return await this.busStopService.create(createBusStopDto);
    }
    catch (err) {
      return { message: err.message || 'Internal Server Error' };
    }
    
  }

  @Get("all")
  async findAll() {
    try {
       return await this.busStopService.findAll();
    }
    catch (err) {
      return { message: err.message || 'Internal Server Error' };
    }
    
  }

  @Get(':route_no')
  async findByRouteNo(@Param('route_no') route_no: string) {
    try {
      return await this.busStopService.findByRouteNo(route_no);
    } catch (err) {
      return { message: err.message || 'Internal Server Error' };
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBusStopDto: UpdateBusStopDto) {
  //   return this.busStopService.update(+id, updateBusStopDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.busStopService.remove(+id);
  // }
}
