// Acessa o objeto "document" que representa a pagina html

//  const { json } = require("body-parser");
//  const { error } = require("console");
//  const { application, response } = require("express");

//Seleciona o elemento com o id indicado do formulario
document
  .getElementById("formulario-registro")

  //adiciona o ouvinte de evento (submit) para capturar o envio do formulario
  .addEventListener("submit", function (event) {
    // previne o comportamento padrão do formulário, ou seja,
    //continuação:- impede que ele seja enviado e recarregue a página
    event.preventDefault();

    //captura os valores dos campos dos formularios
    const name = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("senha").value;

    //requisição HTTP para os endpoint de cadastro de usuario
    fetch("http://localhost:5000/api/v1/user", {
      //arrow
      //realiza uma chamada http para o servidor (a rota definida)
      method: "POST",
      headers: {
        //A requisição será em formato json
        "Content-type": "application/json",  //Não muda
      },
      //Transforma os dados do formulario em uma string json para serem enviados no corpo
      //continuação:- da requisição
      body: JSON.stringify({ name, cpf, password, email }),
    })
      .then((response) => {
        //Tratamento da resposta do servidor / API
        if (response.ok) {
          //Verifica se a resposta foi bem sucedida (Status 2xx)
          return response.json(); // retorna o que a API respondeu
        }
        //Convertendo o erro em formato json
        return response.json().then((err) => {
          //Mensagem retornada do servidor, acessada pela chave "error"
          throw new Error(err.error);
        }); //processa e trata o erro
      }) //Fechamento da then (response)
      .then((data) => {
        //Executa a resposta de sucesso retorna ao usuário final

        //exibe um alerta para o usuário final (front) com o nome do usuário que acabou de ser
        //cadastrado
        // alert("Usuario cadastrado com sucesso! " + data.user.name);

        //Exibe o log no terminal
        console.log("Usuario criado: ", data.user);

        //Reset os campos do formulário após o sucesso do cadastro
        document.getElementById("formulario-registro").reset();
      })
      .catch((error) => {
        //Captura qualquer erro que ocorra durante o processo de requisição / resposta

        //Exibe alerta (front) com o erro processado
        alert("Erro no cadastro: " + error.message);

        console.error("Erro:", error.message);
      });
  });
