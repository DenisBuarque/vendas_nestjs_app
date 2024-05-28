import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity';
import { StateModule } from './state/state.module';
import { StateEntity } from './state/entities/state.entity';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';
import { AddressEntity } from './address/entities/address.entity';
import { CityEntity } from './city/entities/city.entity';

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
      //entities: [__dirname + '/**/*.entity{.ts,.js}'],
      entities:[UserEntity, AddressEntity, StateEntity, CityEntity],
      synchronize: true,
    }),
    UserModule,
    StateModule,
    CityModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
