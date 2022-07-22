// Um desenvolvedor tentou criar um projeto que consome a base de dados de filme do TMDB para criar um organizador de filmes, mas desistiu 
// pois considerou o seu código inviável. Você consegue usar typescript para organizar esse código e a partir daí aprimorar o que foi feito?

// A ideia dessa atividade é criar um aplicativo que: 
//    - Busca filmes
//    - Apresenta uma lista com os resultados pesquisados
//    - Permite a criação de listas de filmes e a posterior adição de filmes nela

// Todas as requisições necessárias para as atividades acima já estão prontas, mas a implementação delas ficou pela metade (não vou dar tudo de graça).
// Atenção para o listener do botão login-button que devolve o sessionID do usuário
// É necessário fazer um cadastro no https://www.themoviedb.org/ e seguir a documentação do site para entender como gera uma 
//API key https://developers.themoviedb.org/3/getting-started/introduction


let apiKey: string;
let requestToken: string;
let username: string;
let password: string;
let sessionId: number;
let listId = '7101979';

let loginButton = document.getElementById('login-button') as HTMLButtonElement;
let searchButton = document.getElementById('search-button');
let searchContainer = document.getElementById('search-container') as HTMLElement;

loginButton?.addEventListener('click', async () => {
    await criarRequestToken();
    await logar();
    await criarSessao();
})

searchButton?.addEventListener('click', async () => {
    let lista = document.getElementById("lista");
    if (lista) {
        lista.outerHTML = "";
    }
    let query = document.getElementById('search') as HTMLInputElement;

    if (query.value != "") {
        let listaDeFilmes: any = await procurarFilme(query.value);
        let ul = document.createElement('ul');

        ul.id = "lista"
        for (const item of listaDeFilmes.results) {
            let li = document.createElement('li');
            let li2 = document.createElement('li');
            let img = document.createElement('img');

            li.appendChild(document.createTextNode('Titulo : ' + item.original_title));
            li2.appendChild(document.createTextNode('Idioma : ' + item.original_language));
            img.src = `https://image.tmdb.org/t/p/w200` + (item.backdrop_path ? item.backdrop_path : '/wwemzKWzjKYJFfCeiB57q3r4Bcm.png');

            ul.appendChild(li);
            ul.appendChild(li2);
            ul.appendChild(img);
        }
        console.log(listaDeFilmes);
        searchContainer?.appendChild(ul);
    } else {
        alert('Digite nome do filme desejado');
    }
})


function validarGetElementById(elementoId: string) {
    const htmlInput = document.getElementById(elementoId) as HTMLInputElement;

    return (htmlInput ? htmlInput.value : "Error");
}

function preencherSenha() {
    // password = document.getElementById('senha').value;
    password = validarGetElementById('senha');
    validateLoginButton();
}

function preencherLogin() {
    //username = document.getElementById('login').value;
    username = validarGetElementById('login');
    validateLoginButton();
}

function preencherApi() {
    //apiKey = document.getElementById('api-key').value;
    apiKey = validarGetElementById('api-key');
    validateLoginButton();
}

function validateLoginButton() {
    if (password && username && apiKey) {
        loginButton.disabled = false;
        console.log('validateLogin true');

    } else {
        loginButton.disabled = true;
        console.log('validateLogin false')
    }
}

class HttpClient {

    static async get(url: string, method: string, body?: any) {
        console.log('class httpclient', method, url, body)
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open(method, url, true);

            request.onload = () => {
                if (request.status >= 200 && request.status < 300) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject({
                        status: request.status,
                        statusText: request.statusText
                    })
                }
            }
            request.onerror = () => {
                reject({
                    status: request.status,
                    statusText: request.statusText
                })
            }

            if (body) {
                request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                body = JSON.stringify(body);
            }
            request.send(body);
        })
    }
}

async function procurarFilme(query: string) {
    query = encodeURI(query)

    console.log(query)
    let result = await HttpClient.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
        "GET"
    )
    return result
}

/* async function adicionarFilme(filmeId: number) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
        method: "GET"
    })
    console.log(result);
} */

async function criarRequestToken() {/* 
    let result: any = await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
        method: "GET"
    }) */

    let result: any = await HttpClient.get(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
        "GET"
    );
    requestToken = result.request_token
}

async function logar() {

    await HttpClient.get(
        `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
        "POST",
        {
            username: `${username}`,
            password: `${password}`,
            request_token: `${requestToken}`
        }
    )

    /* await HttpClient.get({
        url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
        method: "POST",
        body: {
            username: `${username}`,
            password: `${password}`,
            request_token: `${requestToken}`
        }
    }) */
}

async function criarSessao() {
    let result: any = await HttpClient.get(
        `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
        "GET"
    );
    /*  let result = await HttpClient.get({
         url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
         method: "GET"
     }) */
    sessionId = result.session_id;
}
/*
async function criarLista(nomeDaLista, descricao) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
        method: "POST",
        body: {
            name: nomeDaLista,
            description: descricao,
            language: "pt-br"
        }
    })
    console.log(result);
}

async function adicionarFilmeNaLista(filmeId, listaId) {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
        method: "POST",
        body: {
            media_id: filmeId
        }
    })
    console.log(result);
}

async function pegarLista() {
    let result = await HttpClient.get({
        url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
        method: "GET"
    })
    console.log(result);
} */

