import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MARCA } from './marca.entity';
import { RetornoCadastroDTO } from 'src/dto/retorno.dto';
import {v4 as uuid} from 'uuid';
import { CriaMarcaDTO } from './dto/criaMarca.dto';

@Injectable()
export class MarcaService {
  constructor(
    @Inject('MARCA_REPOSITORY')
    private marcaRepository: Repository<MARCA>,
  ) {}

  async listar(): Promise<MARCA[]> {
    return this.marcaRepository.find();
  }

  async inserir(dados: CriaMarcaDTO): Promise<RetornoCadastroDTO>{
    let marca = new MARCA();
        marca.ID = uuid();
        marca.NOME = dados.nome;

    return this.marcaRepository.save(marca)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: marca.ID,
        message: "Marca cadastrada!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao cadastrar."
      };
    })

    
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