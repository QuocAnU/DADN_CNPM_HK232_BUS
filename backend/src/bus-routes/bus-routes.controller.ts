import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusRoutesService } from './bus-routes.service';
import { CreateBusRouteDto } from './dto/create-bus-route.dto';
import { UpdateBusRouteDto } from './dto/update-bus-route.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags("BusRoutes")
@Controller('bus-routes')
export class BusRoutesController {
  constructor(private readonly busRoutesService: BusRoutesService) {}

  @Post("bus-routes/create")
  async create(@Body() createBusRouteDto: CreateBusRouteDto) {
    try {
       return await this.busRoutesService.create(createBusRouteDto);
    }
    catch (err) {
      return { message: err.message || 'Internal Server Error' };
    }
   
  }

  @Get("bus-routes/all")
  async findAll() {
    try {
        return await this.busRoutesService.findAll();
    }
    catch (err) {
      return { message: err.message || 'Internal Server Error' };
    }
   
  }

  @Get('bus-routes/:route_no')
  async findOneByName(@Param('route_no') route_no: string) {
    try {
        return await this.busRoutesService.findOneByRouteNo(route_no);
    }
    catch (err) {
      return { message: err.message || 'Internal Server Error' };
    }
    
  }

  @Patch('bus-routes/:id')
  async update(@Param('id') id: string, @Body() updateBusRouteDto: UpdateBusRouteDto) {
    try {
        return await this.busRoutesService.updateById(id, updateBusRouteDto);
    }
    catch (err) {
      return { message: err.message || 'Internal Server Error' };
    }
    
  }

  @Delete('bus-routes/:id')
  async remove(@Param('id') id: string) {
     try {
        return await this.busRoutesService.remove(id);
    }
    catch (err) {
      return { message: err.message || 'Internal Server Error' };
    }
    
  }
}
