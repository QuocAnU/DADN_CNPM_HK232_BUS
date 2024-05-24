import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusRoutesService } from './bus-routes.service';
import { CreateBusRouteDto } from './dto/create-bus-route.dto';
import { UpdateBusRouteDto } from './dto/update-bus-route.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags("AdminBusRoutes")
@ApiBearerAuth()
@Controller('admin-bus-routes')
export class AdminBusRoutesController {
  constructor(private readonly busRoutesService: BusRoutesService) {}

  @Post("create")
  async create(@Body() createBusRouteDto: CreateBusRouteDto) {
    try {
       return await this.busRoutesService.create(createBusRouteDto);
    }
    catch (err) {
      return { message: err.message || 'Internal Server Error' };
    }
   
  }

  @Get("all")
  async findAll() {
    try {
        return await this.busRoutesService.findAll();
    }
    catch (err) {
      return { message: err.message || 'Internal Server Error' };
    }
   
  }

  @Get(':route_no')
  async findOneByName(@Param('route_no') route_no: string) {
    try {
        return await this.busRoutesService.findOneByRouteNo(route_no);
    }
    catch (err) {
      return { message: err.message || 'Internal Server Error' };
    }
    
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBusRouteDto: UpdateBusRouteDto) {
    try {
        return await this.busRoutesService.updateById(id, updateBusRouteDto);
    }
    catch (err) {
      return { message: err.message || 'Internal Server Error' };
    }
    
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
     try {
        return await this.busRoutesService.remove(id);
    }
    catch (err) {
      return { message: err.message || 'Internal Server Error' };
    }
    
  }
}
