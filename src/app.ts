

let botaoAtualizar = document.getElementById('atualizar-saldo');
let botaoLimpar = document.getElementById('limpar-saldo');

let soma = document.getElementById('soma') as HTMLInputElement;
let campoSaldo = document.getElementById('campo-saldo') as HTMLInputElement;

campoSaldo.innerHTML = '0' // para apresentar na tela
let resultadoSoma: number = 0;

function somarAoSaldo(numero?: number | string) {

    console.log("typeof ", typeof numero);

    if (typeof numero === "number") {
        resultadoSoma += numero;
    } else {
        resultadoSoma = resultadoSoma + Number(numero);
    }

    campoSaldo.innerHTML = "RS " + resultadoSoma.toFixed(2).toString();
}

function limparSaldo() {
    campoSaldo.innerHTML = '';
    resultadoSoma = 0;
}

botaoAtualizar?.addEventListener('click', function () {

    somarAoSaldo(soma.value);

});

botaoLimpar?.addEventListener('click', function () {
    limparSaldo();
});


