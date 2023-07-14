import { Controller, Delete, Get, Param } from "@nestjs/common";
import { Marca } from "./marca.entity";
import { MarcaService } from "./marca.service";

@Controller('/marca')
export class MarcaController{
    constructor(private readonly marcaService: MarcaService){
             
    }

    @Get('listar')
    async listar(): Promise<Marca[]>{
        return this.marcaService.listar();
    }

    
    @Get('ID-:id')
    async listarID(@Param('id') id: string): Promise<Marca>{
        return this.marcaService.localizarID(id);
    }

    @Delete('remove-:id')
    async removeMarca(@Param('id') id: string): Promise<void>{
        this.marcaService.remover(id);
    }

}