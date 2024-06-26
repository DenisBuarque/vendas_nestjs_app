import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { UserModule } from 'src/user/user.module';
import { CityModule } from 'src/city/city.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AddressEntity]),
    UserModule,
    CityModule,
    AuthModule,
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
