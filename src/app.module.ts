import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { CartProductModule } from './cart-product/cart-product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      //entities:[UserEntity, AddressEntity, StateEntity, CityEntity],
      synchronize: true,
    }),
    UserModule,
    StateModule,
    CityModule,
    AddressModule,
    AuthModule,
    JwtModule,
    CategoryModule,
    ProductModule,
    CartModule,
    CartProductModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /*{
      provide: APP_GUARD,
      useClass: RolesGuard,
    },*/
  ],
})
export class AppModule {}
