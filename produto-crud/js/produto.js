xhttp = new XMLHttpRequest();
var listaP;
var api = "https://raphaelbaptistaoliveira.herokuapp.com/api/produto/";

function listarP() {
    xhttp.open("GET", api);
    xhttp.send();
    xhttp.onload = function () {
        listaP = this.responseText;
        listaP = JSON.parse(listaP);
        texto = "";
        i = 0;
        for (const p of listaP) {
            texto += `<tr onclick='editarP(${i})'><td>${p.nome}</td><td>${p.descricao}</td><td>${p.valor}</td></tr>`;
            i++;
        }
        document.getElementById('listaP').innerHTML = texto;
    }
}

function editarP(i) {
    p = listaP[i];
    document.getElementById("nome").value = p.nome;
    document.getElementById("descricao").value = p.descricao;
    document.getElementById("valor").value = p.valor;
    document.getElementById("id").value = p.id;
}

function gravarP() {
    var produto = {};
    produto.nome = document.getElementById("nome").value;
    produto.descricao = document.getElementById("descricao").value;
    produto.valor= document.getElementById("valor").value;
    produto.id = document.getElementById("id").value;
    
    if (produto.id > 0) {
        acao = "PUT";
    } else {
        acao = "POST";
    }

    xhttp.open(acao, api);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(produto));
    xhttp.onload = function () {
        listarP();
        limparP();
    }
}

function limparP() {
    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("id").value = "";
    
}

function apagarP() {
    id = document.getElementById("id").value;
    xhttp.open("DELETE", api + id);
    xhttp.send();
    xhttp.onload = function () {
        alert(this.responseText);
        listarP();
        limparP();
    }
}
listarP();