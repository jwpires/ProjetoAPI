import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";


export class AlteraProdutoDTO{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    @IsOptional()
    nome: string;

    @IsOptional()
    @IsBoolean()
    ativo: boolean;

    @IsOptional()
    @IsNumber()
    valor: number;

    @IsOptional()
    @IsInt()
    estoque: number;

    @IsOptional()
    @IsArray()
    medidas: string[];
    
    @IsOptional()
    @IsArray()
    cor: string[] ; 
    
    @IsOptional()
    @IsString()
    marca: string;
}

