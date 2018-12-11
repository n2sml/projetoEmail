var localToken = localStorage.getItem("localToken");
var container = document.getElementById("container");
var navbar = document.getElementById("navbar1");
var col1 = document.getElementById("col1");
var col2 = document.getElementById("col2");


/*
Recuperar as contas do usuário
*/
var xhttp = new XMLHttpRequest();
xhttp.open("GET", `http://www.henriquesantos.pro.br:8080/api/email/contas/${localToken}`, false);
xhttp.send();
var retorno = xhttp.responseText;
retorno = JSON.parse(retorno);


if (retorno.length == 0) {
    $('#criarEmail').modal();
    let modal = document.getElementById("form");
    modal.addEventListener("submit", function (a) {
        a.preventDefault();

        let object = {
            endereco: document.getElementById("email").value,
            tipo: document.getElementById("select").value,
            foto: "",
            token: localToken
        };

        let json = JSON.stringify(object);
        let xhr = new XMLHttpRequest();

        xhr.open("POST", 'http://www.henriquesantos.pro.br:8080/api/email/contas/new', true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                console.log("criado com sucesso");
            }
        }
        xhr.send(json);

        window.location.reload;
    })
}





for (var c = 0; c < retorno.length; c++) {
    console.log(retorno.length);
    var tag = document.createElement("a");
    tag.setAttribute("class", "dropdown-item");
    tag.setAttribute("href", "#");
    tag.setAttribute("onclick", `showCaixas(${retorno[c].id})`);

    tag.innerHTML = retorno[c].endereco;

    navbar.appendChild(tag);
}

function showCaixas(idConta) {
    col1.innerHTML = "";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://www.henriquesantos.pro.br:8080/api/email/caixas/${localToken}/conta/${idConta}`, false);
    xhttp.send();   
    let retorno = xhttp.responseText;
    retorno = JSON.parse(retorno);

    retorno.forEach(function funcao(x){
        let tag = document.createElement("button");
        tag.setAttribute("onclick", `showMensagens(${idConta}, ${x.id})`);
        tag.innerHTML = x.nome;

        col1.appendChild(tag);
    })

}

function showMensagens(idConta, idCaixa){
    let xhttp = new XMLHttpRequest();
    let endereco = `http://www.henriquesantos.pro.br:8080/api/email/mensagens_email/${localToken}/conta/${idConta}/caixa/${idCaixa}`;
    xhttp.open("GET", endereco , false);
    xhttp.send();   
    let retorno = xhttp.responseText;
    retorno = JSON.parse(retorno);

    console.log(retorno);
    /*
    retorno.forEach(function funcao(x){
        let tag = document.getElementById("");
    })
    */
    

}