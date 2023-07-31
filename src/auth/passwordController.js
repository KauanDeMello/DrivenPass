const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listPasswords(req, res) {
  try {
    const userId = req.user.id;
    const passwords = await prisma.password.findMany({
      where: {
        userId,
      },
    });
    return res.json(passwords);
  } catch (error) {
    console.error('Erro ao listar senhas:', error);
    return res.status(500).json({ error: 'Erro no servidor.' });
  }
}

module.exports = { listPasswords };