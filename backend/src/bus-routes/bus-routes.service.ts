import { Injectable } from '@nestjs/common';
import { CreateBusRouteDto } from './dto/create-bus-route.dto';
import { UpdateBusRouteDto } from './dto/update-bus-route.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BusRoute, BusRouteDocument } from './entities/bus-route.entity';
@Injectable()
export class BusRoutesService {
  constructor(
    @InjectModel(BusRoute.name) private readonly model: Model<BusRouteDocument>,
  ) {}

  async create(createBusRouteDto: CreateBusRouteDto): Promise<BusRoute> {
  try {
    const newBusRoute = await new this.model({
      ...createBusRouteDto,
      createdAt: new Date(),
      number_of_buses: 0,
      deleted: false,
    }).save();
    
    return newBusRoute;
  } catch (error) {
    console.error("Error creating bus route:", error);
    throw new Error("Failed to create bus route");
  }
}
  async findAll(): Promise<BusRoute[]> {
    return await this.model.find({deleted: false}).exec();
  }


  async findOneByRouteNo(route_no: string): Promise<BusRoute | null> {
  try {
    const busRoute = await this.model.findOne({ route_no: route_no, deleted: false }).exec();
    
    return busRoute;
  } catch (error) {
    console.error("Error finding bus route by name:", error);
    throw new Error("Failed to find bus route by name");
  }
}

  async updateById(busRouteId: string, updateBusRouteDto: UpdateBusRouteDto): Promise<BusRoute> {
  try {
    const updateUser = await this.model
      .findByIdAndUpdate(
        busRouteId,
        { ...updateBusRouteDto, updatedAt: new Date() },
        { new: true }
      )
      .exec();
      
    if (!updateUser) {
      throw new Error("User not found");
    }
    
    return updateUser;
  } catch (error) {
    console.error("Error updating bus route by ID:", error);
    throw new Error("Failed to update bus route by ID");
  }
}

  async remove(busRouteId: string): Promise<BusRoute> {
  try {
    const updatedBusRoute = await this.model.findByIdAndUpdate(
      busRouteId,
      { deleted: true },
      { new: true }
    ).exec();
    if(!updatedBusRoute) {
      throw new Error("Failed to remove bus route")
    }
    else return updatedBusRoute;
  } catch (error) {
    console.error("Error removing bus route:", error);
    throw new Error("Failed to remove bus route");
  }
}
}
