
import { Module } from '@nestjs/common';
import { BusRoutesService } from './bus-routes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BusRoute, BusRouteSchema } from './entities/bus-route.entity';
import { AdminBusRoutesController } from './admin-bus-routes.controller';

@Module({
  controllers: [AdminBusRoutesController],
  providers: [BusRoutesService],
  imports: [
    MongooseModule.forFeature([ { name: BusRoute.name , schema: BusRouteSchema}])
  ],
  exports: [BusRoutesService]
})
export class AdminBusRoutesModule {}
