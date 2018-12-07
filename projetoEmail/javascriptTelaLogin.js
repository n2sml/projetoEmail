var conteudo = document.getElementById("topo");
var fecharModal = document.getElementById("fecharModal");
var modalCadastro = document.getElementById("modalCadastro");
var formCadastro = document.getElementById("cadastro");

/*
Cadastrar Usuário:
*/

/*
{
    "login": "login",
    "nome": "nome",
    "sobrenome": "sobrenome",
    "cpf": "cpf",
    "email_secundario": "email_secundario",
    "foto": "foto",      
    "senha": "senha"
}
*/
var listener =
    formCadastro.addEventListener("submit", function (e) {
        e.preventDefault();
        //<!-- nomeCadastro, sobrenomeCadastro, emailCadastro, senhaCadastro, senhaCadastroRepeat, CPF, emailSecundario-->
        var obj = {
            login: document.getElementById("emailCadastro").value,
            nome: document.getElementById("nomeCadastro").value,
            sobrenome: document.getElementById("sobrenomeCadastro").value,
            cpf: document.getElementById("CPF").value,
            email_secundario: document.getElementById("emailSecundario").value,
            foto: "",
            senha: document.getElementById("senhaCadastro").value
        }
        var json = JSON.stringify(obj);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://www.henriquesantos.pro.br:8080/api/email/usuarios/new', true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                $('#modalCadastro').modal('hide');
                console.log(xhr.responseText);

                var modalAlert = document.createElement("div");
                modalAlert.setAttribute("id", "modalAlert");
                modalAlert.setAttribute("class", "modal fade");
                modalAlert.setAttribute("tabindex", "-1");
                modalAlert.setAttribute("role", "dialog");
                modalAlert.setAttribute("aria-labelledby", "exampleModalLabel");
                modalAlert.setAttribute("aria-hidden", "true");

                var modalDialog = document.createElement("div");
                modalDialog.setAttribute("class", "modal-dialog");
                modalDialog.setAttribute("role", "document");

                var modalContent = document.createElement("div");
                modalContent.setAttribute("class", "modal-content");

                var modalBody = document.createElement("div");
                modalBody.setAttribute("class", "modal-body");

                modalBody.innerHTML = `E-mail <strong>${emailEmUso}</strong> cadastrado com sucesso.`

                modalContent.appendChild(modalBody);
                modalDialog.appendChild(modalContent);
                modalAlert.appendChild(modalDialog);
                conteudo.appendChild(modalAlert);
                $("#modalAlert").modal();
                setTimeout(function () {
                    $('#modalAlert').modal('hide');
                }, 2500);


            }

            else if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 400) {
                console.log(xhr.responseText);
                var username = document.getElementById('emailCadastro');
                var emailEmUso = username.value;
                username.value = '';
                username.style.border = "1px solid red";
                username.focus();
                var emailHelp = document.getElementById('emailHelp');
                emailHelp.innerHTML = `E-mail <strong>${emailEmUso}</strong> já está sendo usado.`
                username.style.animation = "treme 0.2s";
                username.addEventListener('click', function () {
                    emailHelp.style.display = 'none';
                    username.style.border = "";
                })
            }
        }
        xhr.send(json);
    });

/*
Checador de Senha:
*/
var senha1 = document.getElementById("senhaCadastro");
var senha2 = document.getElementById("senhaCadastroRepeat");
var erro = document.getElementById("erro");
var acerto = document.getElementById("acerto");


function verificarSenhas() {
    if (senha1.value.length < 4) {

        senha1.focus();
    }
    if (senha1.value == senha2.value) {
        erro.style.display = "none";
        acerto.style.display = "initial";
    } else {
        erro.style.display = "initial";
        acerto.style.display = "none";
    }
}

senha2.addEventListener("keyup", function () {
    verificarSenhas();
})

senha2.addEventListener("blur", function () {
    verificarSenhas();
})



senha1.addEventListener("input", function () {
    forcaAtual = checarForca();
    let campoSenha = document.getElementById('campoSenha');



    document.getElementById('barraForca').remove();
    let barra = document.createElement("div");
    barra.setAttribute("class", "progress");
    barra.setAttribute("style", "height: 5px;");
    barra.setAttribute("id", "barraForca");

    document.getElementById('statusString').remove();
    let statusString = document.createElement("small");
    statusString.setAttribute("class", "form-text text-muted");
    statusString.setAttribute("id", "statusString");

    if (forcaAtual <= 25) {
        status = 'mínimo de 6 caracteres';
    }
    else {
        if ((forcaAtual > 25) && (forcaAtual <= 50)) {
            status = "médio";
        }
        else if ((forcaAtual > 50) && (forcaAtual <= 75)) {
            status = "forte";
        }
        else if ((forcaAtual > 75) && (forcaAtual <= 100)) {
            status = 'excelente';
        }

    }

    statusString.innerText = status;

    /*
    Barra da senha
    */
    let progresso = document.createElement("div");
    progresso.setAttribute("class", "progress-bar progress-bar-striped progress-bar-animated");
    progresso.setAttribute("role", "progressbar");
    progresso.setAttribute("aria-valuenow", forcaAtual);
    progresso.setAttribute("aria-valuemin", "0");
    progresso.setAttribute("aria-valuemax", "10");
    progresso.setAttribute("style", " width:" + forcaAtual + "%");
    console.log(forcaAtual);

    campoSenha.appendChild(statusString);
    barra.appendChild(progresso);
    campoSenha.appendChild(barra);
})



function topTop() {
    var totop = $(window).scrollTop() - 8;
    if (totop <= 0) {
        clearInterval(idInterval);
    } else {
        totop--;
        $(window).scrollTop(totop);
    }
}
function levTop() {
    idInterval = setInterval('topTop();', 1);
}

/*
Força da senha:
*/
function checarForca() {
    let senha = document.getElementById("senhaCadastro").value;
    let forca = 0;
    let letraMaiuscula = false, letraMinuscula = false, tamanhoMinimo = false;
    let tamanhoBom = false, numero = false, caractere = false;

    if (senha.length == 0) {
        forca = 0;
        //console.log("tamanho zero");
    };

    if (senha.length < 8) {
        forca = 5;
        //console.log("um a 8");
    }

    else {
        if ((senha.length >= 8) && (senha.length <= 10)) {

            tamanhoMinimo = true;
        }

        if (senha.length > 15) {
            forca += 25;
            tamanhoBom = true;
        }
        //minusculas
        if (senha.match(/[a-z]+/)) {
            forca += 15;
            letraMinuscula = true;
            //console.log("minuscula");
        }
        //maiusculas
        if (senha.match(/[A-Z]+/)) {
            forca += 15;
            letraMaiuscula = true;
            // console.log("maiuscula");
        }
        //numeros decimais
        if (senha.match(/[0-9]+/)) {
            forca += 15;
            numero = true;
            // console.log("numero");
        }
        //caracteres
        if (senha.match(/W+/)) {
            forca += 25;
            //console.log("caractere");
            caractere = true;
        }
    }

    return forca;
}


/*
Realizar Login:
*/

/*
{
    "login":"login",
    "senha": "senha"
}
*/
//<!-- emailLogin e passwordLogin-->
var localToken;
let formLogin = document.getElementById("formLogin");
let formListener = formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    let obj = {
        login: document.getElementById("emailLogin").value,
        senha: document.getElementById("passwordLogin").value
    }

    let json = JSON.stringify(obj);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://www.henriquesantos.pro.br:8080/api/email/usuarios/login', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            localToken = JSON.parse(xhr.responseText);
            localStorage.setItem("localToken", localToken.token);
            //var x = localStorage.getItem("meuToken", token.token);
            
            window.location = "telaPrincipal.html";
        }
        else if (xhr.readyState == XMLHttpRequest.DONE && xhr.status != 200) {
            console.log('não logou!');
        }
    }

    xhr.send(json);
});




