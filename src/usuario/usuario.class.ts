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

    validarUsuario(){
        var retorno = [];
        if (this.nome == ""){
            retorno.push("Nome inválido ou vazio");
        }
        if (this.telefone == null){
            retorno.push("Telefone inválido ou vazio");
        }
        if (this.cidade  == null){
            retorno.push("Cidade inválida ou vazia");
        }
        if (this.email  == null){
            retorno.push("Email inválido ou vazio");
        }
        if (this.#senha  == null){
            retorno.push("Senha inválida ou vazia");
        }
        if (this.idade == null){
            retorno.push("Idade inválida ou vazia");
        }
        return retorno;
    }

    get senha(){
        return '***********'
    }
    set senha(senhaNova){
        this.#senha = senhaNova;
    }


}