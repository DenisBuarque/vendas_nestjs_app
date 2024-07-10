import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CartProductService } from '../cart-product/cart-product.service';

describe('CartService', () => {
  let service: CartService;
  let repository: Repository<CartEntity>;
  let cartProductService: CartProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: getRepositoryToken(CartEntity),
          useValue: {
            //insertCartProduct: jest.fn().mockResolvedValue(listProducts[0]),
            findOne: jest.fn(),
            createCart: jest.fn(),
            save: jest.fn(),
            clearCart: jest.fn(),
          },
        },
        {
          provide: CartProductService,
          useValue: {
            insertProductInCart: jest.fn(),
            deleteProductCart: jest.fn(),
            updateProductCart: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    cartProductService = module.get<CartProductService>(CartProductService);
    repository = module.get<Repository<CartEntity>>(
      getRepositoryToken(CartEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(cartProductService).toBeDefined();
  });
});
