import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateEntity } from './entities/state.entity';
import { CityEntity } from '../city/entities/city.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StateEntity, CityEntity]),
  ],
  controllers: [StateController],
  providers: [StateService],
})
export class StateModule {}
