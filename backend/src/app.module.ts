import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose'
import { BusRoutesModule } from './bus-routes/bus-routes.module';
import { BusModule } from './bus/bus.module';
import { BusStopsModule } from './bus-stops/bus-stops.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AdminBusRoutesModule } from './bus-routes/admin-bus-routes.module';
import { OsmModule } from './osm/osm.module';
import { MailModule } from './mail/mail.module';
import { DeviceModule } from './device/device.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRoot("mongodb+srv://anlequoc2103:gN33oQ4aScZewTLf@bus.jk6gdpu.mongodb.net/?retryWrites=true&w=majority&appName=BUS"),
    BusRoutesModule,
    AdminBusRoutesModule,
    BusModule,
    BusStopsModule,
    AuthModule,
    OsmModule,
    // MailModule,
    DeviceModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
