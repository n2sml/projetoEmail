produtos = [
    {
        id: 1,
        nome: "Placa de Vídeo",
        preco: "R$120,00",
        imagem: "produto1.jpg"
    },
    {
        id: 2,
        nome: "Memória",
        preco: "R$180,00",
        imagem: "produto2.jpg"
    },
    {
        id: 3,
        nome: "Placa de Vídeo",
        preco: "R$1350,00",
        imagem: "produto3.jpg"
    },
    {
        id: 4,
        nome: "Processador",
        preco: "R$570,00",
        imagem: "produto4.jpg"
    },
    {
        id: 5,
        nome: "Placa de Vídeo",
        preco: "R$1020,00",
        imagem: "produto5.jpg"
    },
    {
        id: 6,
        nome: "Desktop",
        preco: "R$2250,00",
        imagem: "produto6.jpg"
    },
]


let meioDaPag = document.getElementById("meioDaPag");




produtos.forEach(function (valor) {
    let minhaLinha = document.createElement("div");
    minhaLinha.setAttribute("class", "col-4");
    minhaLinha.setAttribute("id", "minhaLinha");

    let meuDiv = document.createElement("div");  
    meuDiv.setAttribute("class", "card");
    meuDiv.setAttribute("style","width: 18rem;");

    let myImage = document.createElement("img");
    myImage.setAttribute("class", "card-img-top");
    myImage.setAttribute("src", valor.imagem);
    
    let myCardBody = document.createElement("div");
    myCardBody.setAttribute("class","card-body");

    let myH = document.createElement("h5");
    myH.setAttribute("class", "card-title");
    myH.innerHTML = valor.nome ;

    let myP = document.createElement("p");
    myP.setAttribute("class", "card-text");
    myP.innerHTML = valor.preco;

    let myA = document.createElement("a");
    myA.setAttribute("href", "#");
    myA.setAttribute("class", "btn btn-primary");
    myA.innerHTML = "Detalhes";
    
    myCardBody.appendChild(myH);
    myCardBody.appendChild(myP);
    myCardBody.appendChild(myA);

    meuDiv.appendChild(myImage);
    meuDiv.appendChild(myCardBody);

    minhaLinha.appendChild(meuDiv);
    meioDaPag.appendChild(minhaLinha);
    });



/*
for (let i = 0; i < produtos.length/2; i++){
    let meuCol = document.createElement("div");
    meuCol.setAttribute("class", "col");
    meuCol.innerHTML = "<img src = "+ produtos[i].imagem + ">";
    meioDaPag.appendChild(meuCol);

}*/