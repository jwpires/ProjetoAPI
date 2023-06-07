import { Injectable } from "@nestjs/common";
import { ProdutoEntity } from "./produto.entity";

@Injectable()
export class ProdutosArmazenados{
    #produtos: ProdutoEntity[] = [];    

    AdicionarProduto(produto: ProdutoEntity){
        this.#produtos.push(produto);
    }

    get Produtos(){        
        return this.#produtos;
    }

    

    private buscaPorID(id: string){
        const possivelProduto = this.#produtos.find(
            prodSalvo => prodSalvo.id === id
        );

        if(!possivelProduto){
            throw new Error('Produto não encontrado');
        }

        return possivelProduto
    }

    async ProdutosByID(id: string){
        const produto = this.buscaPorID(id);
        return produto;
    }

    async ProdutosByNome(nome: string){
        const produto = this.#produtos.filter(
            prodSalvo => prodSalvo.nome.includes(nome)
        );

        if(!produto){
            throw new Error('Produto não encontrado');
        }

        return produto;
    }

    async ProdutosByMarca(marca: string){
        const produto = this.#produtos.filter(
            prodSalvo => prodSalvo.marca.includes(marca)
        );

        if(!produto){
            throw new Error('Produto não encontrado');
        }

        return produto;
    }

    async atualizaProduto(id: string, dadosAtualizacao: Partial<ProdutoEntity>){
        const produto = this.buscaPorID(id);

        Object.entries(dadosAtualizacao).forEach(
            ([chave, valor]) => {
                if(chave=== 'id'){
                    return;
                }

                produto[chave] = valor;
            }
        )

        return produto;
    }

    async removeProduto(id: string){
        const produto = this.buscaPorID(id);
        this.#produtos = this.#produtos.filter(
            prodSalvo => prodSalvo.id !== id
        )
        return produto;
    }

    async abaixaEstoque(id:string, qtde: number){
        const produto = this.buscaPorID(id);
        produto.removeEstoque(qtde);
        return produto;
    }

    async aumentaEstoque(id:string, qtde: number){
        const produto = this.buscaPorID(id);
        produto.adicionaEstoque(qtde);
        return produto;
    }
}