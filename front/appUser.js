//Chamada da função "createUser" para associação ao evento de envio de formulário
// document.getElementById("formulario-registro").addEventListener("submit", createOrganizador);
//  //metodo post


// document.addEventListener("DOMContentLoaded", getAllOrganizador);

document.addEventListener("DOMContentLoaded", getAllOrganizadorTable);

function createOrganizador(event) {
  // previne o comportamento padrão do formulário, ou seja,
  //continuação:- impede que ele seja enviado e recarregue a página
  event.preventDefault();

  //captura os valores dos campos dos formularios
  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;

  //requisição HTTP para os endpoint de cadastro de usuario
  fetch("http://10.89.240.99:5000/api/v1/organizador/", {
    //realiza uma chamada http para o servidor (a rota definida)
    method: "POST",
    headers: {
      //A requisição será em formato json
      "Content-type": "application/json", //Não muda
    },
    //Transforma os dados do formulario em uma string json para serem enviados no corpo
    //continuação:- da requisição
    body: JSON.stringify({ nome, telefone, password, email }),
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
      alert(data.message);
      console.log(data.message);

      //Reset os campos do formulário após o sucesso do cadastro
      document.getElementById("formulario-registro").reset();
    })
    .catch((error) => {
      //Captura qualquer erro que ocorra durante o processo de requisição / resposta

      //Exibe alerta (front) com o erro processado
      alert("Erro no cadastro: " + error.message);

      console.error("Erro:", error.message);
    });
}// fechamento createOrganizador

function getAllOrganizador(){
  fetch("http://10.89.240.99:5000/api/v1/organizador/", {
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((response) => {
      if(response.ok){ //se for igual a true esta certo
        return response.json();
      }
      return response.json().then((err) => {
        throw new Error(err.error);
      }); //then usado para tratar respostas
    })
      //tratamento dos dados
      .then((data) => { //data = dados
        const organizadorList = document.getElementById("organizador-list");
        organizadorList.innerHTML = "" ; //limpa a lista existente 

        data.organizadores.forEach((organizador)=> {
          const listItem = document.createElement("li"); //criando um elemento em lista
          listItem.textContent = `Nome: ${organizador.nome}, telefone: ${organizador.telefone}, Email: ${organizador.email}, Senha: ${organizador.senha}` //conteudo do texto dentro dessa lista
          organizadorList.appendChild(listItem); // insere uma coisa dentro dela
          //percorre o array pega o valor dele e joga pra algum lugar
        }) 
      })
      .catch((error)=> {
        alert("Erro ao obter organizadores" + error.message);
        console.error("Erro: ", error.message);
      })
}

function getAllOrganizadorTable(){
  fetch("http://10.89.240.99:5000/api/v1/organizador/", {
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((response) => {
      if(response.ok){
        return response.json();
      }
      return response.json().then((err) => {
        throw new Error(err.error);
      });
    })
    .then((data) => {
      const organizadorList = document.getElementById("organizador-list-tabela");
      organizadorList.innerHTML = "";

      // Certifique-se de que a estrutura de dados está correta
      data.organizadores.forEach((organizador) => {
        const tr = document.createElement("tr");

        const tdNome = document.createElement("td");
        tdNome.textContent = organizador.nome;
        tr.appendChild(tdNome);

        const tdtelefone = document.createElement("td");
        tdtelefone.textContent = organizador.telefone;
        tr.appendChild(tdtelefone);

        const tdEmail = document.createElement("td");
        tdEmail.textContent = organizador.email;
        tr.appendChild(tdEmail);

        // Corrigido para usar a variável correta
        organizadorList.appendChild(tr);
      });
    })
    .catch((error) => {
      alert("Erro ao obter organizadores: " + error.message);
      console.error("Erro: ", error.message);
    });
}