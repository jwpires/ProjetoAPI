import { Usuario } from "./usuario.class";

export class UsuariosArmazenados{
    #usuarios = [];    

    AdicionarUsuario(usuario: Usuario){
        this.#usuarios.push(usuario);
    }

    get Usuarios(){        
        return this.#usuarios;
    }
}