import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marca } from 'src/marca/marca.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'www.db4free.net',
      port: 3306,
      username: 'projetoapi',
      password: 'ProjetoAPI@',
      database: 'projetoapi',
      entities: [Marca],
      synchronize: true, 
    }),
  ],
})
export class AppModule {}