import { Test, TestingModule } from '@nestjs/testing';
import { BusRoutesController } from './bus-routes.controller';
import { BusRoutesService } from './bus-routes.service';

describe('BusRoutesController', () => {
  let controller: BusRoutesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusRoutesController],
      providers: [BusRoutesService],
    }).compile();

    controller = module.get<BusRoutesController>(BusRoutesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
