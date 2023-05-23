import { Body, Controller, Get, Post } from "@nestjs/common";
import { emit } from "process";
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
    async criaUsuario(@Body() dadosUsuario: Usuario){
       
        var test = new Usuario(dadosUsuario.nome,dadosUsuario.idade,dadosUsuario.cidade,dadosUsuario.email,dadosUsuario.telefone,dadosUsuario.senha);
        var retorno = test.validarUsuario();
        var retornoUsuario;

        if(retorno.length > 0){
            retornoUsuario={
                retorno,
                status:'Usuário não foi criado'
            }
        }
        else{
            this.clsUsuariosArmazenados.AdicionarUsuario(test);
            retornoUsuario={
                dadosUsuario,
                status:'Usuário Criado'
            }
        }
        
        return retornoUsuario;
    }
}