var token = localStorage.getItem("localToken");
container = document.getElementById("container");

/*
Recuperar as contas do usuário
*/
var url = `http://www.henriquesantos.pro.br:8080/api/email/contas/${token}`;

var xhttp = new XMLHttpRequest();
xhttp.open("GET", url, false);
xhttp.send();
var retorno = xhttp.responseText;
retorno = JSON.parse(retorno);



if(retorno.length === 0){
    let tag = document.createElement("button");
    tag.innerHTML = "CRIE SUA CONTA"
   

    container.appendChild(tag);
}