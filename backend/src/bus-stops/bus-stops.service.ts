import { Injectable } from '@nestjs/common';
import { CreateBusStopDto } from './dto/create-bus-stop.dto';
import { UpdateBusStopDto } from './dto/update-bus-stop.dto';
import { InjectModel } from '@nestjs/mongoose';
import { BusStop, BusStopDocument } from './entities/bus-stop.entity';
import { Model } from 'mongoose';

@Injectable()
export class BusStopsService {
  constructor(
    @InjectModel(BusStop.name) private readonly model: Model<BusStopDocument>,
  ) {}

  async create(createBusStopDto: CreateBusStopDto) : Promise<BusStop> {
    try {
    const newBusStop = await new this.model({
      ...createBusStopDto,
      createdAt: new Date(),
      deleted: false,
    }).save();
    
    return newBusStop;
  } catch (error) {
    console.error("Error creating bus stop:", error);
    throw new Error("Failed to create bus stop");
  }
  }

  async findAll() : Promise<BusStop[]> {
    return await this.model.find().exec();
  }

  async findByRouteNo(route_no: string) : Promise<BusStop[]> {
    try {
    return await this.model.find({ route_no: route_no }).exec();
  } catch (error) {
    console.error("Error finding bus route by route no:", error);
    throw new Error("Failed to find bus route by route no");
  }
  }

  // update(id: number, updateBusStopDto: UpdateBusStopDto) {
  //   return `This action updates a #${id} busStop`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} busStop`;
  // }
}
