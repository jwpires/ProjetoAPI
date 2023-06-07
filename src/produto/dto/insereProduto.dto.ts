import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CriaProdutoDTO{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    nome: string;

    @IsBoolean()
    ativo: boolean;

    @IsNumber()
    valor: number;

    @IsInt()
    estoque: number;

    @IsArray()
    medidas: string[] = [];
    
    @IsArray()
    cor: string[] = []; 
    
    @IsString()
    marca: string;
}