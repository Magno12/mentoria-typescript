console.log('Arquivo de testes. Pode mexer nele como quiser.')

let employee: { code: number, name: string }

employee = { code: 10, name: "desafio 01" }


console.log("ver saida", employee)

////
// desafio 02


class pessoa {
    private nome: string;
    private idade: number;
    private profissao: string;


    constructor(nome: string, idade: number, profissao: string) {
        this.nome = nome;
        this.idade = idade;
        this.profissao = profissao;
    }

}

let pessoa1 = new pessoa('maria', 29, 'atriz');
let pessoa2 = new pessoa('roberto', 19, 'padeiro');

console.log("desafio 02 ultilizando class ", pessoa1, pessoa2);
/* let pessoa1 = {};
pessoa1.nome = "maria";
pessoa1.idade = 29;
pessoa1.profissao = "atriz" */

/* let pessoa2 = {}
pessoa2.nome = "roberto";
pessoa2.idade = 19;
pessoa2.profissao = "Padeiro"; */

let listPessoas: Array<pessoa> = [];


let pessoa3 = new pessoa("laura", 32, "Atriz");
let pessoa4 = new pessoa("carlos", 19, "padeiro")


listPessoas.push(pessoa1);
listPessoas.push(pessoa2);
listPessoas.push(pessoa3);
listPessoas.push(pessoa4);


for (const iterator of listPessoas) {
    console.log('mostrar de pessoas ultilizando for of', iterator)
}

