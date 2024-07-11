import { Module } from '@nestjs/common';
import { CorreiosService } from './correios.service';
import { CorreiosController } from './correios.controller';
import { HttpModule } from '@nestjs/axios';
import { CityModule } from 'src/city/city.module';

@Module({
  imports: [HttpModule, CityModule],
  controllers: [CorreiosController],
  providers: [CorreiosService],
})
export class CorreiosModule {}
