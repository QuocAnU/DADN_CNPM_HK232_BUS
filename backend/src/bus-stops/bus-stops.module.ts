import { Module } from '@nestjs/common';
import { BusStopsService } from './bus-stops.service';
import { BusStopsController } from './bus-stops.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BusStop, BusStopSchema } from './entities/bus-stop.entity';

@Module({
  controllers: [BusStopsController],
  providers: [BusStopsService],
  imports: [
    MongooseModule.forFeature([ {
      name : BusStop.name , 
      schema : BusStopSchema
    }])
  ],
  exports: [BusStopsService]
})
export class BusStopsModule {}
