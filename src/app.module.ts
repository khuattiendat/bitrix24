import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmOptions } from './configs/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({ ...typeOrmOptions, autoLoadEntities: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
