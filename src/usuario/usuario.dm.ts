import { Injectable } from "@nestjs/common";
import { Usuario } from "./usuario.class";

@Injectable()
export class UsuariosArmazenados{
    #usuarios = [];    

    AdicionarUsuario(usuario: Usuario){
        this.#usuarios.push(usuario);
    }

    get Usuarios(){        
        return this.#usuarios;
    }
}