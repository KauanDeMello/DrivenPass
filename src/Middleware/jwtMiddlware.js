const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ... outras funções existentes no authController ...

// Rota para criar uma nova senha associada ao usuário autenticado
async function createPassword(req, res) {
  try {
    const { service, username, password } = req.body;

    // Obtém o ID do usuário autenticado através do token
    const userId = req.user.id;

    // Cria a nova senha associada ao usuário
    const newPassword = await prisma.password.create({
      data: {
        service,
        username,
        password,
        user: { connect: { id: userId } }, // Conecta a senha ao usuário pelo ID
      },
    });

    return res.status(201).json(newPassword);
  } catch (error) {
    console.error('Erro ao criar senha:', error);
    return res.status(500).json({ error: 'Erro no servidor.' });
  }
}

// Exporta as funções existentes no authController e a nova função createPassword
module.exports = { register, login, createPassword };