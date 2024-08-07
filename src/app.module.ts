import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';

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
      migrations: [__dirname + '/migration/{.ts,*.js}'],
      migrationsRun: true,
      //synchronize: true,
    }),
    UserModule,
    StateModule,
    CityModule,
    AddressModule,
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
