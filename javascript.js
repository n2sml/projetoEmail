var conteudo = document.getElementById("topo");
var fecharModal = document.getElementById("fecharModal");
var modalCadastro = document.getElementById("modalCadastro");
var formCadastro = document.getElementById("cadastro");
var contaSelecionada;
var stringContaSelecionada;

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

                modalBody.innerHTML = `E-mail <strong>${obj.nome}</strong> cadastrado com sucesso.`

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
Criar Conta:
*/

function criarConta() {

    let navbar = document.getElementById('navbar');
    //navbar.style.display = "none";
    $('#criarEmail').modal();


    let modal = document.getElementById("form");
    modal.addEventListener("submit", function (a) {
        a.preventDefault();

        let object = {
            endereco: document.getElementById("email").value,
            tipo: document.getElementById("select").value,
            foto: "",
            token: localStorage.getItem("token", token.token)
        };

        let json = JSON.stringify(object);
        let xhr = new XMLHttpRequest();

        xhr.open("POST", 'http://www.henriquesantos.pro.br:8080/api/email/contas/new', true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {

            //se a conta for criada:
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {

                $('#criarEmail').modal('hide');


                var modalAlert = document.createElement("div");
                modalAlert.setAttribute("id", "modalContaCriada");
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

                modalBody.innerHTML = `Conta de E-mail Criada com sucesso.`

                modalContent.appendChild(modalBody);
                modalDialog.appendChild(modalContent);
                modalAlert.appendChild(modalDialog);
                conteudo.appendChild(modalAlert);
                $("#modalContaCriada").modal();
                setTimeout(function () {
                    $('#modalContaCriada').modal('hide');
                }, 2500);


                $('#modalCriado').modal();

                let tokenString = localStorage.getItem("token", token.token);
                var xhttp = new XMLHttpRequest();
                xhttp.open("GET", `http://www.henriquesantos.pro.br:8080/api/email/contas/${tokenString}`, false);
                xhttp.send();
                var retorno = xhttp.responseText;
                retorno = JSON.parse(retorno);


                var navbarItens = document.getElementById("navbarItens");
                navbarItens.innerHTML = "";

                for (var c = 0; c < retorno.length; c++) {
                    var tag = document.createElement("a");
                    tag.setAttribute("class", "dropdown-item");
                    tag.setAttribute("href", "#");
                    tag.setAttribute("onclick", `showCaixas(${retorno[c].id})`);

                    tag.innerHTML = retorno[c].endereco;

                    navbarItens.appendChild(tag);
                }

                navbar.style.display = "block";
            }

        }
        xhr.send(json);

        window.location.reload;
    })
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
var token;
let formLogin = document.getElementById("formLogin");
let formListener = formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    //pegou email e senha:
    let obj = {
        login: document.getElementById("emailLogin").value,
        senha: document.getElementById("passwordLogin").value
    }

    //deu stringfy: 
    let json = JSON.stringify(obj);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://www.henriquesantos.pro.br:8080/api/email/usuarios/login', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {

        //Se logou com sucesso:
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            //Colocou o token dentro da variavel:
            token = JSON.parse(xhr.responseText);
            localStorage.setItem("token", token.token);

            console.log(token);

            var tokenString = localStorage.getItem("token", token.token);

            console.log(tokenString);

            //navbarItens.appendChild(tag);
            $('#modalLogin').modal('hide');

            //Exibe a navbar:
            let navbar = document.getElementById('navbar');
            navbar.style.display = 'block';

            apagarPagina();
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", `http://www.henriquesantos.pro.br:8080/api/email/contas/${tokenString}`, false);
            xhttp.send();
            var retorno = xhttp.responseText;
            retorno = JSON.parse(retorno);

            console.log(retorno.length);

            //Se não tiver conta:
            if (retorno.length == 0) {
                criarConta();
            }

            var navbarItens = document.getElementById("navbarItens");

            let bemVindo = document.getElementById("bemVindo");
            bemVindo.innerHTML = `Bem-vindo, <b>${obj.login}</b>.`

            let col = document.getElementById("col1");
            //<h1 class="animated zoomIn">tooFast. Rápido como uma flecha.</h1>
            col.innerHTML = `<h3 class = "animated zoomIn" align="center"> <b>${obj.login}</b>, escolha uma conta:</h4>`;

            let listGroup = document.createElement("ul");
            listGroup.setAttribute("class", "list-group");
            listGroup.setAttribute("id", "listinha");


            for (var c = 0; c < retorno.length; c++) {
                //criando para a caixinha:
                var tag = document.createElement("a");
                tag.setAttribute("class", "dropdown-item");
                tag.setAttribute("href", "#");
                tag.setAttribute("id", `conta${retorno[c].id}`);
                tag.setAttribute("onclick", `showCaixas(${retorno[c].id})`);


                tag.innerHTML = retorno[c].endereco;
                navbarItens.appendChild(tag);

                //Criando os cards da col1:
                let listGroupItem = document.createElement("li");
                listGroupItem.setAttribute("class", "list-group-item py-1");
                listGroupItem.innerHTML = retorno[c].endereco;
                listGroupItem.setAttribute("onclick", `showCaixas(${retorno[c].id})`);
                listGroup.appendChild(listGroupItem);

            }
            col.appendChild(listGroup);






        }
        else if (xhr.readyState == XMLHttpRequest.DONE && xhr.status != 200) {
            exibirFalhaLogin();
        }
    }

    xhr.send(json);
});


var novaConta = document.getElementById("novaConta");
novaConta.addEventListener("click", function (e) {
    e.preventDefault();
    criarConta();
})

function showCaixas(idConta) {
    /*
    let atual = document.getElementById("suasContas");                
    atual.innerHTML = `<b>${stringContaSelecionada}</b>`;   
    */

    contaSelecionada = idConta;
    col1.innerHTML = "";
    var tokenString = localStorage.getItem("token", token.token);
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://www.henriquesantos.pro.br:8080/api/email/caixas/${tokenString}/conta/${idConta}`, false);
    xhttp.send();
    let retorno = xhttp.responseText;
    retorno = JSON.parse(retorno);
    let nav = document.createElement("nav");
    nav.setAttribute("aria-label", "Page navigation example");

    let ul = document.createElement("ul");
    ul.setAttribute("class", "pagination");

    /**
     *  <!-- Botão de enviar email -->
      <div style = "display : none">
          <a href= "#">
            <img src="send.png" width="50px" height="50px" alt="Envie um E-mail." />
          </a>
        </div>
     */

    let btn = document.createElement("img");
    btn.setAttribute("onclick", "botaoEnviar()");
    btn.setAttribute("title", "Enviar E-mail");
    btn.setAttribute("type", "image");
    btn.setAttribute("src", "send.png");
    btn.setAttribute("width", "5%");
    btn.setAttribute("width", "5%");
    btn.setAttribute("id", "botaoEnviarEmail");
    col1.appendChild(btn);


    let li = document.createElement("div");
    li.setAttribute("class", "btn-group");
    li.setAttribute("role", "group");
    retorno.forEach(function funcao(x) {



        let tag = document.createElement("button");
        tag.setAttribute("id", "caixasEmail");
        tag.setAttribute("type", "button");
        tag.setAttribute("class", "btn btn-secondary");
        tag.setAttribute("aria-pressed", "true");
        tag.setAttribute("onclick", `showMensagens(${idConta}, ${x.id})`);

        tag.innerHTML = x.nome;

        li.appendChild(tag);
        ul.appendChild(li);

    })

    nav.appendChild(ul);
    col1.appendChild(nav);

    let accordion = document.createElement("div");
    accordion.setAttribute("class", "accordion");
    accordion.setAttribute("id", "accordion");


    col1.appendChild(accordion);
    console.log("idConta = " + idConta);
    showMensagens(idConta, retorno[0].id);
}

function apagarPagina() {
    //Apagou a pagina:
    let conteudoPagina = document.getElementById("conteudoPagina");
    conteudoPagina.innerHTML = "";

    let tagDeFora = document.createElement("div");
    tagDeFora.setAttribute("class", "row");

    let col1 = document.createElement("div");
    col1.setAttribute("class", "col");
    col1.setAttribute("id", "col1");
    /*
        let col2 = document.createElement("div");
        col2.setAttribute("class", "col");
        col2.setAttribute("id", "col2");
    
        let col3 = document.createElement("div");
        col3.setAttribute("class", "col");
        col3.setAttribute("id", "col3");
    */

    tagDeFora.appendChild(col1);
    /*
    tagDeFora.appendChild(col2);
    tagDeFora.appendChild(col3);
*/
    conteudoPagina.appendChild(tagDeFora);

}

function showMensagens(idConta, idCaixa) {
    //showMensagens(${idConta}, ${x.id})
    //Get em http://www.henriquesantos.pro.br:8080/api/email/mensagens_email/:token/conta/:conta_id/caixa/:caixa_id

    var tokenString = localStorage.getItem("token", token.token);
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://www.henriquesantos.pro.br:8080/api/email/mensagens_email/${tokenString}/conta/${idConta}/caixa/${idCaixa}`, false);
    xhttp.send();
    let retorno = xhttp.responseText;
    retorno = JSON.parse(retorno);
    console.log(retorno);
    let col1 = document.getElementById('col1');

    let div = document.createElement("div");
    div.setAttribute("class", "list-group-item");
    console.log("tamanho do retorno " + retorno.length);

    let accordion = document.getElementById("accordion");

    //Se não houver mensagem:
    if (retorno.length == 0) {
        accordion.innerHTML = "";
        let ul = document.createElement("ul");
        ul.setAttribute("class", "list-group");

        let li = document.createElement("li");
        li.setAttribute("class", "list-group-item disabled");

        li.innerHTML = "<i>Caixa de mensagens vazia.</i>";

        ul.appendChild(li);
        accordion.appendChild(ul);
    }

    else {
        accordion.innerHTML = "";
        for (let c = 0; c < retorno.length; c++) {
            let card = document.createElement("div");
            card.setAttribute("class", "card");

            let cardHeader = document.createElement("div");
            cardHeader.setAttribute("class", "card-Header");
            cardHeader.setAttribute("id", `heading${retorno[c].id}`);

            let mb = document.createElement("h5");
            mb.setAttribute("class", "mb-0");

            let btn = document.createElement("button");
            if (c == 0) {
                btn.setAttribute("class", "list-group-item list-group-item-action active fade");
            }
            else {
                btn.setAttribute("class", "list-group-item list-group-item-action fade");
            }
            btn.setAttribute("class", "list-group-item list-group-item-action");
            btn.setAttribute("type", "button");
            btn.setAttribute("data-toggle", "collapse");
            //INSIRA O ID DA DIVCOLLAPSE AQUI COM O SHARP
            btn.setAttribute("data-target", `#collapse${retorno[c].id}`);

            btn.setAttribute("aria-expanded", "false");

            //INSIRA O ID DA DIVCOLLAPSE AQUI SEM O SHARP
            btn.setAttribute("aria-controls", `collapse${retorno[c].id}`);
            console.log(retorno[c].id);
            btn.innerHTML = `<b>${retorno[c].assunto}</b>`;

            let divCollapse = document.createElement("div");
            divCollapse.setAttribute("id", `collapse${retorno[c].id}`);
            divCollapse.setAttribute("class", "collapse");
            divCollapse.setAttribute("aria-labelledby", `heading${retorno[c].id}`);
            divCollapse.setAttribute("data-parent", "accordion");

            let divBody = document.createElement("div");
            divBody.setAttribute("class", "card-body");

            divBody.innerHTML = retorno[c].corpo + "<br>";

            let botaoApagar = document.createElement("button");
            botaoApagar.setAttribute("class", "btn btn-outline-dark btn-sm");
            botaoApagar.setAttribute("id", "botaoDeletarMensagem");
            botaoApagar.setAttribute("onclick", `apagarEmail(token.token, ${contaSelecionada}, ${idCaixa}, ${retorno[c].id})`);
            botaoApagar.setAttribute("data-target", "#myModal");
            botaoApagar.innerHTML = "Excluir Mensagem";

            divBody.appendChild(botaoApagar);

            mb.appendChild(btn);
            cardHeader.appendChild(mb);
            card.appendChild(cardHeader);

            divCollapse.appendChild(divBody);
            card.appendChild(divCollapse);
            accordion.appendChild(card);
            //http://www.henriquesantos.pro.br:8080/api/email/mensagens_email/${tokenString}/mensagem/${c.id}

        }
    }



	/*
	
	<div class="accordion" id="accordionExample">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Collapsible Group Item #1
        </button>
      </h5>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Collapsible Group Item #2
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingThree">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Collapsible Group Item #3
        </button>
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
</div>
	
	*/


    //col1.appendChild(div);

}


function botaoEnviar() {
    console.log("oi");
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://www.henriquesantos.pro.br:8080/api/email/contas`, false);
    xhttp.send();
    let retorno = xhttp.responseText;
    retorno = JSON.parse(retorno);

    let selectPara = document.getElementById("selectPara");
    let selectCC = document.getElementById("selectCC");
    let selectCCo = document.getElementById("selectCCo");

    retorno.forEach(function funcao(x) {
        let tag = document.createElement('option');
        tag.setAttribute("value", x.id);
        tag.innerHTML = x.endereco;
        selectCCo.appendChild(tag);
    })

    retorno.forEach(function funcao(x) {
        let tag = document.createElement('option');
        tag.setAttribute("value", x.id);
        tag.innerHTML = x.endereco;
        selectPara.appendChild(tag);
    })

    retorno.forEach(function funcao(x) {
        let tag = document.createElement('option');
        tag.setAttribute("value", x.id);
        tag.innerHTML = x.endereco;
        selectCC.appendChild(tag);
    })


    $('#enviarEmail').modal();
}

var enviarEmail = document.getElementById("enviarEmail");
enviarEmail.addEventListener("submit", function (e) {
    e.preventDefault();

    console.log(contaSelecionada);
    let object = {
        token: localStorage.getItem("token", token.token),
        conta_id: contaSelecionada,
        assunto: document.getElementById("assuntoEmail").value,
        corpo: document.getElementById("conteudoEmail").value,
        destinatarios_para: document.getElementById("selectPara").value,
        destinatarios_cc: document.getElementById("selectCC").value,
        destinatarios_cco: document.getElementById("selectCCo").value,
    };

    let json = JSON.stringify(object);
    let xhr = new XMLHttpRequest();
    console.log(json);
    xhr.open("POST", 'http://www.henriquesantos.pro.br:8080/api/email/mensagens_email/enviar', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {

        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            $('#enviarEmail').modal("hide");

            $("#emailEnviado").modal();
            setTimeout(function () {
                $('#emailEnviado').modal('hide');
            }, 1500);

            console.log(xhr.responseText);
        }

    }
    xhr.send(json);
})

let lorem = document.getElementById("loremIpsumLink");
lorem.addEventListener("click", function (x) {
    $('#modalCadastro').modal("hide");
    $('#loremIpsum').modal();
})

function exibirFalhaLogin() {
    $("#falhaLogin").modal();
    setTimeout(function () {
        $('#falhaLogin').modal('hide');
    }, 1500);
}


function apagarEmail(stringToken, conta, idCaixa, idMensagem) {
    let xhttp = new XMLHttpRequest();
    console.log(stringToken);

    xhttp.open("DELETE", `http://www.henriquesantos.pro.br:8080/api/email/mensagens_email/${token.token}/conta/${conta}/caixa/${idCaixa}/mensagem/${idMensagem}`, false);
    xhttp.send();

    let retorno = xhttp.responseText;
    //retorno = JSON.parse(retorno);

    $("emailDelete").modal();
    setTimeout(function () {
        $('emailDelete').modal('hide');
    }, 1500);

    console.log("Retorno do Delete: " + retorno);

    showMensagens(conta, idCaixa);



}