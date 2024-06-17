import { Module, forwardRef } from '@nestjs/common';
import { CartProductService } from './cart-product.service';
import { CartProductController } from './cart-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProductEntity } from './entities/cart-product.entity';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartProductEntity]), forwardRef(() => CartModule),],
  controllers: [CartProductController],
  providers: [CartProductService],
  exports: [CartProductService]
})
export class CartProductModule {}
