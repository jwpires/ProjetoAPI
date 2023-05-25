import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CriaUsuarioDTO{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    nome: string;

    @IsEmail(undefined,{message: "Email inválido"})
    email:string;

    @MinLength(6,{message: "Tamanho da senha inválido"})
    senha:string;

    @IsInt({message: "Idade inválida"})
    idade: BigInteger;

    @IsString({message: "Cidade inválida"})
    cidade: string;
    
    @IsString({message: "Telefone inválido"})
    telefone: string;
}