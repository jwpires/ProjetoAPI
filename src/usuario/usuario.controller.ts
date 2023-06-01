import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CriaUsuarioDTO } from "./dto/usuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { UsuariosArmazenados } from "./usuario.dm";
import {v4 as uuid} from 'uuid';
import { listaUsuarioDTO } from "./dto/listaUsuario.dto";
import { AlteraUsuarioDTO } from "./dto/atualizaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController{
    constructor(private clsUsuariosArmazenados: UsuariosArmazenados){
             
    }

    @Get()
    async RetornoUsuarios(){
        const usuariosListados = await this.clsUsuariosArmazenados.Usuarios;
        const listaRetorno = usuariosListados.map(
            usuario => new listaUsuarioDTO(
                usuario.id,
                usuario.nome
            )
        );
        
        return listaRetorno;
    }
     // fazer GET de filtro de usuário por nome ou email

    @Post()    
    async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO){
       
        var usuario = new UsuarioEntity(uuid(),dadosUsuario.nome,dadosUsuario.idade,dadosUsuario.cidade,dadosUsuario.email,dadosUsuario.telefone,dadosUsuario.senha);
        
        var retornoUsuario;
            
        this.clsUsuariosArmazenados.AdicionarUsuario(usuario);
        retornoUsuario={
            id: usuario.id,
            message:'Usuário Criado'
        }
    
        
        return retornoUsuario;
    }

    
    @Put('/:id')
    async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AlteraUsuarioDTO){
        const usuarioAtualizado = await this.clsUsuariosArmazenados.atualizaUsuario(id, novosDados);
        return {
            usuario: usuarioAtualizado,
            message: 'Usuário atualizado'
        }
    }
}