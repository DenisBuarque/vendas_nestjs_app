import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';

@Injectable()
export class CorreiosService {
  constructor(private readonly httpService: HttpService) {}
  async findAddressByCep(cep: string): Promise<AxiosResponse<any>> {
    return this.httpService.axiosRef
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
  }
}
