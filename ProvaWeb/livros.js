var arrayLivros = [
  {
    isbn: "9781593275846",
    titulo: "Eloquent JavaScript, Second Edition",
    ano: "2014",
  },
  {
    isbn: "9781449331818",
    titulo: "Learning JavaScript Design Patterns",
    ano: "2012",
  },
  {
    isbn: "9781449365035",
    titulo: "Speaking JavaScript",
    ano: "2014",
  },
  {
    isbn: "9781491950296",
    titulo: "Programming JavaScript Applications",
    ano: "2014",
  },
  {
    isbn: "9781593277574",
    titulo: "Understanding ECMAScript 6",
    ano: "2016",
  },
  {
    isbn: "9781491904244",
    titulo: "You Don't Know JS",
    ano: "2015-12-27T00:00:00.000Z",
  }
];



var telaForm = document.getElementById("meuForm");

var telaLista = document.getElementById("minhaLista");

var btnLivros = document.getElementById("btnLivros");
btnLivros.addEventListener("click", function () {
  telaForm.style.display = "none";
  telaLista.style.display = "inline";
  telaLista.innerHTML = "";

  arrayLivros.forEach(function (valor) {
    console.log(valor);
    
    var item = document.createElement("tr");
    var texto = document.createTextNode(`${valor.titulo} - ${valor.ano} - ${valor.isbn}`);
    telaLista.appendChild(item);
    item.appendChild(texto);

  });


});



var btnCadastrar = document.getElementById("btnCadastrar");
btnCadastrar.addEventListener("click", function () {
  telaLista.style.display = "none";
  telaForm.style.display = "block";
});

var meioDaTela = document.getElementById("meioDaPag");
var btnMenuPrincipal = document.getElementById("menuPrincipal");

btnMenuPrincipal.addEventListener("click", function(){
  telaLista.style.display = "none";
  telaForm.style.display = "none";
})