import { Test, TestingModule } from '@nestjs/testing';
import { BusStopsService } from './bus-stops.service';

describe('BusStopsService', () => {
  let service: BusStopsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusStopsService],
    }).compile();

    service = module.get<BusStopsService>(BusStopsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
