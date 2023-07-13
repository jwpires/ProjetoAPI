import { Module } from '@nestjs/common';
import { ProdutoModule } from './produto/produto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm'


@Module({
  imports: [TypeOrmModule.forRoot(),UsuarioModule,ProdutoModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource){}
}
