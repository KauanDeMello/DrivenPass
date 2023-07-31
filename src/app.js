const express = require('express');
const routes = require('./routes');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());


app.use('/auth', routes);

app.get('/protected', (req, res) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, 'heheCatto');
    const userId = decoded.id;


    return res.json({ message: 'Rota protegida acessada com sucesso.' });
  } catch (error) {
    return res.status(401).json({ error: 'Acesso não autorizado.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});