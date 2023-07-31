const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();




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


module.exports = { register, login, createPassword };