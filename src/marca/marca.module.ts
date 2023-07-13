import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marca } from './marca.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Marca])],
  providers: [MarcaService],
  controllers: [MarcaController],
})
export class UsersModule {}