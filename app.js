require('dotenv').config(); // SEMPRE no topo

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');


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

// Configuração da sessão
app.use(session({
  secret: 'sportshoes_secret',
  resave: false,
  saveUninitialized: false
}));

// Middleware global para views
app.use((req, res, next) => {
    res.locals.isLoggedIn = !!req.session.userRole; // true se tiver algum usuário logado
    res.locals.isAdmin = req.session.userRole === 'admin';
    next();
});


// Rotas
const publicRoutes = require('./routes/public.routes');
const adminRoutes = require('./routes/admin.routes');
const authRoutes = require('./routes/auth.routes');


app.use('/', publicRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

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