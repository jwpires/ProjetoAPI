import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import {v4 as uuid} from 'uuid';
import { AlteraProdutoDTO } from "./dto/atualizaProduto.dto";
import { CriaProdutoDTO } from "./dto/insereProduto.dto";
import { listaProdutoDTO } from "./dto/listaProduto.dto";
import { ProdutosArmazenados } from "./produto.dm";
import { ProdutoEntity } from "./produto.entity";

@Controller('/produtos')
export class ProdutoController{
    constructor(private clsProdutosArmazenados: ProdutosArmazenados){
             
    }

    @Get()
    async RetornoProdutos(){
        const produtosListados = await this.clsProdutosArmazenados.Produtos;
        const listaRetorno = produtosListados.map(
            produto => new listaProdutoDTO(
                produto.id,
                produto.nome, 
                produto.estoque,
                produto.valor
            )
        );
        
        return listaRetorno;
    }

    @Get('id-:id')
    async RetornoByID(@Param('id') id: string){
        const produtosListados = await this.clsProdutosArmazenados.ProdutosByID(id);
        
        const produto = new listaProdutoDTO(
            produtosListados.id,
            produtosListados.nome, 
            produtosListados.estoque,
            produtosListados.valor
        )
        
        
        return produto;
    }

    @Get('nome-:nome')
    async RetornoByNome(@Param('nome') nome: string){    
        const produtosListados = await this.clsProdutosArmazenados.ProdutosByNome(nome);
        
        const listaRetorno = produtosListados.map(
            produto => new listaProdutoDTO(
                produto.id,
                produto.nome, 
                produto.estoque,
                produto.valor
            )
        );
        
        
        return listaRetorno;
    }

    @Get('marca-:marca')
    async RetornoByMarca(@Param('marca') marca: string){    
        const produtosListados = await this.clsProdutosArmazenados.ProdutosByMarca(marca);
        
        const listaRetorno = produtosListados.map(
            produto => new listaProdutoDTO(
                produto.id,
                produto.nome, 
                produto.estoque,
                produto.valor
            )
        );
        
        
        return listaRetorno;
    }

    @Post()    
    async criaProduto(@Body() dados: CriaProdutoDTO){
       
        var produto = new ProdutoEntity(uuid(),dados.nome,dados.ativo,dados.valor,
                                    dados.estoque,dados.medidas,dados.cor,dados.marca);
        
        var retornoProduto;
            
        this.clsProdutosArmazenados.AdicionarProduto(produto);
        retornoProduto={
            id: produto.id,
            message:'Produto Criado'
        }
    
        
        return retornoProduto;
    }

    
    @Put('/:id')
    async atualizaProduto(@Param('id') id: string, @Body() novosDados: AlteraProdutoDTO){
        const produtoAtualizado = await this.clsProdutosArmazenados.atualizaProduto(id, novosDados);
        return {
            produto: produtoAtualizado,
            message: 'Produto atualizado'
        }
    }

    @Delete('/:id')
    async removeProduto(@Param('id') id: string){
        const produtoRemovido = await this.clsProdutosArmazenados.removeProduto(id);
        return {
            usuario: produtoRemovido,
            message: 'Produto removido'
        }
    }

    @Put('estoque/add:qtde-:id')
    async adicionaEstoque(@Param('id') id: string, @Param('qtde') qtde: number){
        const produtoAtualizado = await this.clsProdutosArmazenados.aumentaEstoque(id, qtde);
        return {
            produto: produtoAtualizado,
            message: 'Produto atualizado'
        }
    }

    @Put('estoque/rem:qtde-:id')
    async removeEstoque(@Param('id') id: string, @Param('qtde') qtde: number){
        const produtoAtualizado = await this.clsProdutosArmazenados.abaixaEstoque(id, qtde);
        return {
            produto: produtoAtualizado,
            message: 'Produto atualizado'
        }
    }

   
}