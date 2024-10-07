let organizadores = [];
let nextId = 0; // Variável para controlar o próximo ID

module.exports = class organizadorController {
  static async createOrganizador(req, res) {
    const { nome, email, senha, telefone } = req.body;

    if (!nome || !email || !senha || !telefone) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    } else if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    } else if (telefone.length !== 11 || isNaN(telefone)) {
      return res
        .status(400)
        .json({
          error:
            "Telefone inválido. Deve conter exatamente 11 dígitos numéricos",
        });
    }

    const existingOrganizador = organizadores.find(
      (organizador) => organizador.email === email
    );
    if (existingOrganizador) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // Gera um novo organizador com o próximo ID disponível
    const newOrganizador = { id: nextId++, nome, email, senha, telefone };
    organizadores.push(newOrganizador);

    return res
      .status(201)
      .json({
        message: "Organizador criado com sucesso",
        organizador: newOrganizador,
      });
  }

  static async getAllOrganizadores(req, res) {
    return res
      .status(200)
      .json({ message: "Obtendo todos os organizadores", organizadores });
  }

  static async getOrganizadorById(req, res) {
    const organizadorId = parseInt(req.params.id);
    const organizador = organizadores.find((org) => org.id === organizadorId);

    if (!organizador) {
      return res.status(404).json({ error: "Organizador não encontrado" });
    }

    return res
      .status(200)
      .json({ message: "Organizador encontrado", organizador });
  }

  static async updateOrganizador(req, res) {
    const { id, nome, email, senha, telefone } = req.body;

    if (!id || !nome || !email || !senha || !telefone) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    const organizadorIndex = organizadores.findIndex(
      (org) => org.id === parseInt(id)
    );

    if (organizadorIndex === -1) {
      return res.status(404).json({ error: "Organizador não encontrado" });
    }

    const existingOrganizador = organizadores.find(
      (organizador) => organizador.email === email
    );
    if (existingOrganizador && existingOrganizador.id != id) {
      return res
        .status(400)
        .json({ error: "Email já cadastrado por outro usuário" });
    }

    organizadores[organizadorIndex] = {
      id: parseInt(id),
      nome,
      email,
      senha,
      telefone,
    };

    return res
      .status(200)
      .json({
        message: "Organizador atualizado com sucesso",
        organizador: organizadores[organizadorIndex],
      });
  }

  static async deleteOrganizador(req, res) {
    const organizadorId = parseInt(req.params.id);

    const organizadorIndex = organizadores.findIndex(
      (org) => org.id === organizadorId
    );

    if (organizadorIndex === -1) {
      return res.status(404).json({ error: "Organizador não encontrado" });
    }

    organizadores.splice(organizadorIndex, 1);

    return res
      .status(200)
      .json({ message: "Organizador excluído com sucesso" });
  }
};
