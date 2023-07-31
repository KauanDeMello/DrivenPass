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

async function createPassword(req, res) {
  try {
    const { service, username, password } = req.body;
    const userId = req.user.id;
    const newPassword = await prisma.password.create({
      data: {
        service,
        username,
        password,
        user: { connect: { id: userId } },
      },
    });
    return res.status(201).json(newPassword);
  } catch (error) {
    console.error('Erro ao criar senha:', error);
    return res.status(500).json({ error: 'Erro no servidor.' });
  }
}


async function updatePassword(req, res) {
  try {
    const { passwordId, service, username, password } = req.body;
    const userId = req.user.id;
    const existingPassword = await prisma.password.findFirst({
      where: {
        id: passwordId,
        userId,
      },
    });

    if (!existingPassword) {
      return res.status(404).json({ error: 'Senha não encontrada.' });
    }

    const updatedPassword = await prisma.password.update({
      where: {
        id: passwordId,
      },
      data: {
        service,
        username,
        password,
      },
    });
    return res.json(updatedPassword);
  } catch (error) {
    console.error('Erro ao atualizar senha:', error);
    return res.status(500).json({ error: 'Erro no servidor.' });
  }
}

async function deletePassword(req, res) {
  try {
    const { passwordId } = req.body;
    const userId = req.user.id;
    const existingPassword = await prisma.password.findFirst({
      where: {
        id: passwordId,
        userId,
      },
    });

    if (!existingPassword) {
      return res.status(404).json({ error: 'Senha não encontrada.' });
    }

    await prisma.password.delete({
      where: {
        id: passwordId,
      },
    });
    return res.json({ message: 'Senha excluída com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir senha:', error);
    return res.status(500).json({ error: 'Erro no servidor.' });
  }
}

module.exports = { listPasswords, createPassword, updatePassword, deletePassword };