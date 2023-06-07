export class listaProdutoDTO{
    constructor(
        readonly id:string,
        readonly nome: string,
        readonly estoque: number,
        readonly valor: number
    ){}
}