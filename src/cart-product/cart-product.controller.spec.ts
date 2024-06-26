import { Test, TestingModule } from '@nestjs/testing';
import { CartProductController } from './cart-product.controller';
import { CartProductService } from './cart-product.service';

describe('CartProductController', () => {
  let controller: CartProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartProductController],
      providers: [CartProductService],
    }).compile();

    controller = module.get<CartProductController>(CartProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
