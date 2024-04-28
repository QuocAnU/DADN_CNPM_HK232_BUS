import { Test, TestingModule } from '@nestjs/testing';
import { BusStopsController } from './bus-stops.controller';
import { BusStopsService } from './bus-stops.service';

describe('BusStopsController', () => {
  let controller: BusStopsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusStopsController],
      providers: [BusStopsService],
    }).compile();

    controller = module.get<BusStopsController>(BusStopsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
