import { Test, TestingModule } from '@nestjs/testing';
import { PoeController } from './poe.controller';
import { PoeService } from './poe.service';

describe('PoeController', () => {
  let controller: PoeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoeController],
      providers: [PoeService],
    }).compile();

    controller = module.get<PoeController>(PoeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
