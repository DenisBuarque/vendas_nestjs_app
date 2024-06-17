import { Module, forwardRef } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { CartProductModule } from 'src/cart-product/cart-product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity]),
    forwardRef(() => CartProductModule),
  ],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService]
})
export class CartModule {}
