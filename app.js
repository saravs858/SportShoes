require('dotenv').config(); // SEMPRE no topo

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// 🔌 Conexão com MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🔥 MongoDB Atlas conectado com sucesso'))
  .catch(err => console.error('❌ Erro ao conectar no MongoDB:', err));

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Rotas
const publicRoutes = require('./routes/public.routes');
const adminRoutes = require('./routes/admin.routes');

app.use('/', publicRoutes);
app.use('/admin', adminRoutes);

// Rota de erro genérica
app.use((req, res) => {
  res.status(404).render('error', {
    message: 'Página não encontrada',
    error: { status: 404 }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});