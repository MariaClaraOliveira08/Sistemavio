const connect = require("../db/connect");

module.exports = class organizadorController {
  
  //create
  static async createOrganizador(req, res) {
    const { nome, email, senha, telefone } = req.body;

    if (!nome || !email || !senha || !telefone) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    
    }
  }

  //get
  static async getAllOrganizadores(req, res) {
      const query = `SELECT * FROM organizador`; //busca e mostra a tabela usuario
      try {
        connect.query(query, function (err, results) {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Erro interno no servidor" });
          } //chama a const connect, vai receber a query e a função
          return res
            .status(200)
            .json({ message: "Lista de organizador", organizadores:results }); //passa os resultados pra users
        });
      } catch (error) {
        console.error("Erro ao executar consulta:", error);
        return res.status(500).json({ error: "Erro interno no servidor" });
      }
  }


  //update
  static async updateOrganizador(req, res) {
    const { nome, email, senha, telefone } = req.body;

    if (!nome || !email || !senha || !telefone) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }
    const query = `UPDATE organizador SET nome=?,email=?,senha=?,telefone=? WHERE id_organizador = ?`;
    const values = [nome, email, senha, telefone];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            //acessa o objeto ER... //código de erro
            return res
              .status(400)
              .json({ error: "Email já cadastrado por outro organizador" });
          } else {
            console.error(err);
            return res.status(500).json({ error: "Erro interno do servidor" });
          }
        }
        if (results.affectedRows === 0) {
          return res.status(400).json({ error: "Organizador não encontrado" });
        }
        return res
          .status(200)
          .json({ message: "Organizador atualizado com sucesso" });
      });
    } catch (error) {
      console.error("Erro ao executar consulta", error);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
  
  //delete
  static async deleteOrganizador(req, res){
    const organizadorId = req.params.id
    const query = ` DELETE FROM organizador WHERE id_organizador = ?`;
    const values = [organizadorId]

    try{
      connect.query(query,values,function(err,results){
        if(err){
          console.error(err);
          return res.status(500).json({error:"Erro interno no servidor"})
        }
        if(results.affectedRows === 0){
          return res.status(404).json({error:"Organizador não encontrado"})
        }

        return res.status(200).json({message:"Organizador excluido com sucesso"})
      })
    }catch(error){
      console.error(error);
      return res.status(500).json({error:"Erro interno do servidor"})
    }
  }
};
  