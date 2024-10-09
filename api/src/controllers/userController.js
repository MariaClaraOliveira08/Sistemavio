const connect = require("../db/connect");
module.exports = class userController {
  static async createUser(req, res) {
    const { cpf, email, password, name } = req.body;

    if (!cpf || !email || !password || !name) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    } else if (isNaN(cpf) || cpf.length !== 11) {
      return res.status(400).json({
        error: "CPF inválido. Deve conter exatamente 11 dígitos numéricos",
      });
    } else if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    } else {
      // Construção da query INSERT
      const query = `INSERT INTO usuario (cpf, password, email, name) VALUES('${cpf}', '${password}', '${email}', '${name}')`;

      //Executando a query criada
      try{
        connect.query(query, function(err){
          if(err){
            console.log(err)
            console.log(err.code)
            if(err.code === 'ER_DUP_ENTRY'){
              return res.status(400).json({error:"O email ja esta vinculado a outro usuario",});
            }else{
              return res.status(500).json({ error: "Erro interno do servidor", });
            }

          }else{
            return res.status(201).json({ message: "Usuário criado com sucesso" });
          }
          
        });
      }catch (error) {
          console.error(error);
          res.status(500).json({error:"Erro interno do servidor"})
      }

      // Cria e adiciona novo usuário

    }
  }

  static postLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    return res
      .status(200)
      .json({ message: "Login realizado com sucesso", user });
  }

  static async getAllUsers(req, res) {
    return res.status(200).json({ message: "Obtendo todos os usuários" });
  }

  static async getUserById(req, res) {
    const userId = req.params.cpf;
    const user = users.find((user) => user.cpf === userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(200).json({ message: "Usuário encontrado", user });
  }

  static async updateUser(req, res) {
    // Desestrutura os dados enviados no corpo da requisição (CPF, email, senha e nome)
    const { cpf, email, password, name } = req.body;

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!cpf || !email || !password || !name) {
      // Se algum campo estiver faltando, retorna uma resposta de erro 400 (Bad Request)
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    // Procura o índice do usuário no array 'users' com base no CPF
    const userIndex = users.findIndex((user) => user.cpf === cpf);

    // Se o usuário não for encontrado (userIndex será -1), retorna uma resposta de erro 404 (Not Found)
    if (userIndex === -1) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Atualiza os dados do usuário no array 'users' com os novos valores recebidos no corpo da requisição
    users[userIndex] = { cpf, email, password, name };

    // Retorna uma resposta de sucesso 200 (OK) com uma mensagem informando que o usuário foi atualizado
    return res.status(200).json({
      message: "Usuário atualizado com sucesso",
      user: users[userIndex],
    });
  }

  static async deleteUser(req, res) {
    // Obtém o parâmetro 'id' da requisição, que é o CPF do usuário a ser deletado
    const userId = req.params.cpf;

    // Procura o índice do usuário no array 'users' com base no CPF
    const userIndex = users.findIndex((user) => user.cpf === userId);

    // Se o usuário não for encontrado (userIndex será -1), retorna uma resposta de erro 404 (Not Found)
    if (userIndex === -1) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Remove o usuário do array 'users' usando o método 'splice', que deleta o item no índice encontrado
    users.splice(userIndex, 1);

    // Retorna uma resposta de sucesso 200 (OK) com uma mensagem informando que o usuário foi excluído
    return res.status(200).json({ message: "Usuário excluído com sucesso" });
  }
};
