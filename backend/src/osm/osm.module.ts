import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OsmService } from './osm.service';
import { OsmController } from './osm.controller';

@Module({
  imports: [HttpModule],
  providers: [OsmService],
  controllers: [OsmController],
})
export class OsmModule {}
