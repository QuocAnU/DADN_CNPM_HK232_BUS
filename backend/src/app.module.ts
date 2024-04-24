import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BusRoutesModule } from './bus-routes/bus-routes.module';
import { BusModule } from './bus/bus.module';


@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://anlequoc2103:gN33oQ4aScZewTLf@bus.jk6gdpu.mongodb.net/?retryWrites=true&w=majority&appName=BUS"),
    BusRoutesModule,
    BusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
