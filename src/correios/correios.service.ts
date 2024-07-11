import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { CityService } from 'src/city/city.service';
import { CityEntity } from 'src/city/entities/city.entity';

@Injectable()
export class CorreiosService {
  constructor(
    private readonly httpService: HttpService,
    private readonly cityService: CityService
  ) {}

  async findAddressByCep(cep: string): Promise<AxiosResponse<any>> {
    const data = await this.httpService.axiosRef
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((result) => {
        if (result.data.erro === 'true') throw new NotFoundException('Cep not found.');
        return result.data;
      })
      .catch((error: AxiosError) => {
        throw new BadRequestException(
          'Error when search cep address: ',
          error.message,
        );
      });

      //const city: CityEntity | undefined = await this.cityService.findCityByName(data.localidade, data.uf).catch(() => undefined);
      return data;

  }
}
