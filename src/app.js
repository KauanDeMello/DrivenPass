const express = require('express');
const routes = require('./routes');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Roteador de autenticação
app.use('/auth', routes);

// Rota protegida (exemplo)
app.get('/protected', (req, res) => {
  // Verifica o token de autenticação na requisição
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    // Verifica o token usando a mesma chave secreta usada para gerá-lo
    const decoded = jwt.verify(token, 'heheCatto');
    const userId = decoded.id;

    // Faça aqui as operações que requerem autenticação do usuário

    return res.json({ message: 'Rota protegida acessada com sucesso.' });
  } catch (error) {
    return res.status(401).json({ error: 'Acesso não autorizado.' });
  }
});

// Inicie o servidor na porta desejada
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});