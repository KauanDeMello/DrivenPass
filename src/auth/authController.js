const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();


// Função para criar o token de autenticação
function generateAuthToken(userId) {
  const token = jwt.sign({ id: userId }, 'sua_chave_secreta_aqui', { expiresIn: '1h' });
  return token;
}

// Rota de registro (criar login)
async function register(req, res) {
  try {
    const { email, password } = req.body;

    // Verifica se o e-mail já está cadastrado no banco de dados
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'O e-mail já está em uso.' });
    }

    // Criptografa a senha antes de salvar no banco de dados
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o novo usuário no banco de dados
    const newUser = await prisma.user.create({ data: { email, password: hashedPassword } });

    // Gera o token de autenticação e envia como resposta
    const token = generateAuthToken(newUser.id);
    return res.status(201).json({ token });
  } catch (error) {
    console.error('Erro no registro:', error);
    return res.status(500).json({ error: 'Erro no servidor.' });
  }
}

// Rota de login
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Verifica se o e-mail está cadastrado no banco de dados
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'E-mail não encontrado.' });
    }

    // Compara a senha fornecida com a senha criptografada no banco de dados
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha incorreta.' });
    }

    // Gera o token de autenticação e envia como resposta
    const token = generateAuthToken(user.id);
    return res.json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Erro no servidor.' });
  }
}



module.exports = { register, login };
