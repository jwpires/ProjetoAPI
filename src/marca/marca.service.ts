import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MARCA } from './marca.entity';

@Injectable()
export class MarcaService {
  constructor(
    @Inject('MARCA_REPOSITORY')
    private marcaRepository: Repository<MARCA>,
  ) {}

  async listar(): Promise<MARCA[]> {
    return this.marcaRepository.find();
  }

  async inserir(): Promise<void>{
    
  }

  localizarID(ID: string): Promise<MARCA> {
    return this.marcaRepository.findOne({
      where: {
        ID,
      },
    });
  }

  async remover(id: string): Promise<void> {
    const user = await this.localizarID(id);
    await this.marcaRepository.remove(user);
  }
}