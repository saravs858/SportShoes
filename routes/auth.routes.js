const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Página de Login
router.get('/login', (req, res) => {
    res.render('auth/login', { error: null });
});

// Processar Login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.compararSenha(senha))) {
            return res.render('auth/login', { error: 'Email ou senha incorretos.' });
        }
        
        // Salvar na sessão
        req.session.userId = user._id;
        req.session.userRole = user.role;
        req.session.userName = user.nome;

        res.redirect('/');
    } catch (err) {
        res.render('auth/login', { error: 'Erro no servidor. Tente novamente.' });
    }
});

// Página de Cadastro
router.get('/registro', (req, res) => {
    res.render('auth/registro', { error: null });
});

// Processar Cadastro
router.post('/registro', async (req, res) => {
    const { nome, email, senha, codigoAdmin } = req.body;
    try {
        // Verificar se já existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.render('auth/registro', { error: 'Este email já está cadastrado.' });
        }

        // Definir role (simulação: se usar um código secreto, vira admin)
        const role = (codigoAdmin === 'ADMIN123') ? 'admin' : 'user';

        const newUser = new User({ nome, email, senha, role });
        await newUser.save();

        res.redirect('/auth/login');
    } catch (err) {
        res.render('auth/registro', { error: 'Erro ao cadastrar. Verifique os dados.' });
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;