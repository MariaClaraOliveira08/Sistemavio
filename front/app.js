// Acessa o objeto "document" que representa a pagina html

const { json } = require("body-parser");
const { application } = require("express");

//Seleciona o elemento com o id indicado do formulario
document
    .getElementById("formulario-registro")

    //adiciona o ouvinte de evento (submit) para capturar o envio do formulario
    .addEventListener("submit", function (event){
        // previne o comportamento padrão do formulário, ou seja, 
        //continuação:- impede que ele seja enviado e recarregue a página
        event.preventDefault();

        //captura os valores dos campos dos formularios
        const name = Document.getElementById("nome");
        const cpf = document.getElementById("cpf");
        const email = document.getElementById("email");
        const password = document.getElementById("senha");

        //requisição HTTP para os endpoint de cadastro de usuario
        fetch("http://localhost:5000/api/v1/user",{
            //realiza uma chamada http para o servidor (a rota definida)
            method: "POST",
            headers: {
                //A requisição será em formato json
                "Content-type": application/json,
            },
            //Transforma os dados do formulario em uma string json para serem enviados no corpo
            //continuação:- da requisição
            body: JSON.stringify({name, cpf, password, email,}),
        })
     
    });