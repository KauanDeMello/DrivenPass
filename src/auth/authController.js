const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();


function generateAuthToken(userId) {
  const token = jwt.sign({ id: userId }, 'sua_chave_secreta_aqui', { expiresIn: '1h' });
  return token;
}


async function register(req, res) {
  try {
    const { email, password } = req.body;

  
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'O e-mail já está em uso.' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

   
    const newUser = await prisma.user.create({ data: { email, password: hashedPassword } });

    
    const token = generateAuthToken(newUser.id);
    return res.status(201).json({ token });
  } catch (error) {
    console.error('Erro no registro:', error);
    return res.status(500).json({ error: 'Erro no servidor.' });
  }
}


async function login(req, res) {
  try {
    const { email, password } = req.body;

   
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'E-mail não encontrado.' });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

   
    const token = generateAuthToken(user.id);
    return res.json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Erro no servidor.' });
  }
}



module.exports = { register, login };
