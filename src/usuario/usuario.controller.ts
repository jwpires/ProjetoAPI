import { Body, Controller, Get, Post } from "@nestjs/common";
import { CriaUsuarioDTO } from "./dto/usuario.dto";
import { Usuario } from "./usuario.class";
import { UsuariosArmazenados } from "./usuario.dm";

@Controller('/usuarios')
export class UsuarioController{
    clsUsuariosArmazenados: UsuariosArmazenados; 
    constructor(){
        this.clsUsuariosArmazenados = new UsuariosArmazenados();        
    }

    @Get()
    async RetornoUsuarios(){
        return this.clsUsuariosArmazenados.Usuarios;
    }


    @Post()    
    async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO){
       
        var usuario = new Usuario(dadosUsuario.nome,dadosUsuario.idade,dadosUsuario.cidade,dadosUsuario.email,dadosUsuario.telefone,dadosUsuario.senha);
        
        var retornoUsuario;
            
        this.clsUsuariosArmazenados.AdicionarUsuario(usuario);
        retornoUsuario={
            dadosUsuario,
            status:'Usuário Criado'
        }
    
        
        return retornoUsuario;
    }
}