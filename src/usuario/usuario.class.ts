export class Usuario{
    nome: string;
    idade: BigInteger;
    cidade: string;
    email: string;
    telefone: string;
    #senha: string; 
    constructor(nome: string,idade: BigInteger,cidade: string,email: string,telefone: string,senha: string){
        this.nome = nome;
        this.idade = idade;
        this.cidade = cidade;
        this.email = email;
        this.telefone = telefone;
        this.#senha = senha;
    }

    
    get senha(){
        return '***********'
    }
    set senha(senhaNova){
        this.#senha = senhaNova;
    }


}