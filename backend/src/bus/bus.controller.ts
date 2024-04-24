import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusService } from './bus.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Bus")
@Controller('bus')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @Post("bus/create")
  async create(@Body() createBusDto: CreateBusDto) {
    try {
       return await this.busService.create(createBusDto);
    }
    catch (err) {
      return { message: err.message || 'Internal Server Error' };
    }
    
  }

  @Get("bus/all")
  async findAll() {
    try {
        return await this.busService.findAll();
    }
    catch (err) {
      return { message: err.message || 'Internal Server Error' };
    }
   
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.busService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBusDto: UpdateBusDto) {
  //   return this.busService.update(+id, updateBusDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.busService.remove(+id);
  // }
}
