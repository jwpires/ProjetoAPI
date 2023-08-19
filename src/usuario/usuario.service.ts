import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import {v4 as uuid} from 'uuid';
import { Usuario } from './usuario.entity';
import { CriaUsuarioDTO } from './dto/usuario.dto';
import { PessoaService } from 'src/pessoa/pessoa.service';



@Injectable()
export class UsuarioService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private usuarioRepository: Repository<Usuario>,
    private readonly pessoaRepository: PessoaService
  ) {}

  async listar(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async inserir(dados: CriaUsuarioDTO): Promise<RetornoCadastroDTO>{
    let usuario = new Usuario();
        usuario.id= uuid();
        usuario.idpessoa = await this.pessoaRepository.localizarID(dados.idpessoa)
        usuario.email = dados.email;
        usuario.login = dados.login;
        usuario.senha = dados.senha;

    return this.usuarioRepository.save(usuario)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: usuario.id,
        message: "Usuario cadastrada!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao cadastrar." + error.message
      };
    })

    
  }

  localizarID(id: string): Promise<Usuario> {
    return this.usuarioRepository.findOne({
      where: {
        id,
      },
    });
  }

  listaLogins(): Promise<any[]> {
    return this.usuarioRepository.find({
      select:{
        login:true,
      }
    });
  }

//   async listaComForn(NOME_MARCA?: string): Promise<listaMarcaFornDTO[]> {
    
//     if (NOME_MARCA != undefined){
//       var retorno = await (this.usuarioRepository // select marca.id as ID, marca.nome AS NOME_, pes_f.nome from marca ......
//       .createQueryBuilder('marca')
//       .select('marca.id','ID')
//       .addSelect('marca.nome','nome_marca')
//       .addSelect('pes_f.nome','nome_fornecedor')
//       .leftJoin('for_marca', 'fm','fm.idmarca = marca.id')  
//       .leftJoin('fornecedor', 'for','for.id = fm.idfornecedor')    
//       .leftJoin('pessoa', 'pes_f','for.idpessoa = pes_f.id')  
//       .where('marca.nome like :nomemarca',{ nomemarca: `%${NOME_MARCA}%` })         
//       .getRawMany());  
//     }
//     else{      
//       var retorno = await (this.usuarioRepository // select marca.id as ID, marca.nome AS NOME_, pes_f.nome from marca ......
//       .createQueryBuilder('marca')
//       .select('marca.id','ID')
//       .addSelect('marca.nome','nome_marca')
//       .addSelect('pes_f.nome','nome_fornecedor')
//       .leftJoin('for_marca', 'fm','fm.idmarca = marca.id')  
//       .leftJoin('fornecedor', 'for','for.id = fm.idfornecedor')    
//       .leftJoin('pessoa', 'pes_f','for.idpessoa = pes_f.id')  
//       .getRawMany());      
//     }

      

//     const listaRetorno = retorno.map(
//       marca => new listaMarcaFornDTO(
//         marca.ID,
//         marca.nome_marca,
//         marca.nome_fornecedor
//       )
//     );

//     return listaRetorno;    
//   }

  async remover(id: string): Promise<RetornoObjDTO> {
    const usuario = await this.localizarID(id);
    
    return this.usuarioRepository.remove(usuario)
    .then((result) => {
      return <RetornoObjDTO>{
        return: usuario,
        message: "Usuario excluida!"
      };
    })
    .catch((error) => {
      return <RetornoObjDTO>{
        return: usuario,
        message: "Houve um erro ao excluir." + error.message
      };
    });  
  }

  async alterar(id: string, dados: CriaUsuarioDTO): Promise<RetornoCadastroDTO> {
    const usuario = await this.localizarID(id);

    Object.entries(dados).forEach(
      ([chave, valor]) => {
          if(chave=== 'id'){
              return;
          }

          usuario[chave] = valor;
      }
    )

    return this.usuarioRepository.save(usuario)
    .then((result) => {
      return <RetornoCadastroDTO>{
        id: usuario.id,
        message: "Usuario alterada!"
      };
    })
    .catch((error) => {
      return <RetornoCadastroDTO>{
        id: "",
        message: "Houve um erro ao alterar." + error.message
      };
    });
  }

  async validaEmail(email: string){
    // const possivelUsuario = this.usuarioRepository.find(
    //     usuario => usuario.email === email  
    // );
    // return (possivelUsuario !== undefined);

    let possivelUsuario  = await this.usuarioRepository.findOne({
        where: {
          email,
        },
      });

    return (possivelUsuario !== undefined)
  }

}


