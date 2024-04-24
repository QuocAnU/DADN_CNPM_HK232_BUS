import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BusRoutesModule } from './bus-routes/bus-routes.module';


@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://anlequoc2103:gN33oQ4aScZewTLf@bus.jk6gdpu.mongodb.net/?retryWrites=true&w=majority&appName=BUS"),
    BusRoutesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
