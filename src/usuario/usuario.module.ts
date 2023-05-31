import { Module } from "@nestjs/common";
import { EmailUnicoValidator } from "src/validacao/email-unico.validator";
import { UsuarioController } from "./usuario.controller";
import { UsuariosArmazenados } from "./usuario.dm";


@Module({
    controllers:[UsuarioController],
    providers:[UsuariosArmazenados, EmailUnicoValidator]
})
export class UsuarioModule{

}