import { Injectable } from '@nestjs/common';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bus, BusDocument } from './entities/bus.entity';
import { BusRoute, BusRouteDocument } from '../bus-routes/entities/bus-route.entity'
@Injectable()
export class BusService {
  constructor(
    @InjectModel(Bus.name) private readonly busModel: Model<BusDocument>,
    @InjectModel(BusRoute.name) private readonly busRouteModel: Model<BusRouteDocument>,

  ) {}

  async create(CreateBusDto: CreateBusDto) : Promise<Bus> {
    try{
      const newBus = await new this.busModel({
      ...CreateBusDto,
      createdAt: new Date(),
      deleted: false,
    }).save();

    const busRoute = await this.busRouteModel.findOne({
        route_no: CreateBusDto.route_no,
      });
    
    if(busRoute){
      busRoute.number_of_buses +=1;
      await busRoute.save();
    }

    return newBus
    } catch (error) {
      console.error("Error creating bus route:", error);
    throw new Error("Failed to create bus route");
    };
   }


    async findAll(): Promise<Bus[]> {
    return await this.busModel.find().exec();
  }
  }

 