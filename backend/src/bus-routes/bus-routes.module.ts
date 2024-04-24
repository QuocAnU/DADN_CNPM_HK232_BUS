
import { Module } from '@nestjs/common';
import { BusRoutesService } from './bus-routes.service';
import { BusRoutesController } from './bus-routes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BusRoute, BusRouteSchema } from './entities/bus-route.entity';

@Module({
  controllers: [BusRoutesController],
  providers: [BusRoutesService],
  imports: [
    MongooseModule.forFeature([ { name: BusRoute.name , schema: BusRouteSchema}])
  ],
  exports: [BusRoutesService]
})
export class BusRoutesModule {}
