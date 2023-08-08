import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { MARCA } from "./marca.entity";
import { MarcaService } from "./marca.service";
import { CriaMarcaDTO } from "./dto/criaMarca.dto";
import { RetornoCadastroDTO } from "src/dto/retorno.dto";


@Controller('/marca')
export class MarcaController{
    constructor(private readonly marcaService: MarcaService){
             
    }

    @Get('listar')
    async listar(): Promise<MARCA[]>{
        return this.marcaService.listar();
    }

    @Post('')
    async criaMarca(@Body() dados: CriaMarcaDTO): Promise<RetornoCadastroDTO>{        
        return this.marcaService.inserir(dados)        
    }
    
    @Get('ID-:id')
    async listarID(@Param('id') id: string): Promise<MARCA>{
        return this.marcaService.localizarID(id);
    }

    @Delete('remove-:id')
    async removeMarca(@Param('id') id: string): Promise<void>{
        this.marcaService.remover(id);
    }

}