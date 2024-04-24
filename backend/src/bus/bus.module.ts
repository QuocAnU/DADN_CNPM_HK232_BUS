import { Module } from '@nestjs/common';
import { BusService } from './bus.service';
import { BusController } from './bus.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bus, BusSchema } from './entities/bus.entity';
import { BusRoute, BusRouteSchema } from 'src/bus-routes/entities/bus-route.entity';

@Module({
  controllers: [BusController],
  providers: [BusService],
  imports: [
    MongooseModule.forFeature([ 
      {name: Bus.name, schema: BusSchema},
      {name: BusRoute.name, schema: BusRouteSchema}
    ])
  ],
  exports: [BusService]
})
export class BusModule {}
