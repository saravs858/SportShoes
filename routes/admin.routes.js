const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const Tenis = require('../models/Tenis');

// Todas as rotas usam o middleware isAdmin
router.use(isAdmin);

// Dashboard Admin
router.get('/', async (req, res) => {
    const totalProdutos = await Tenis.countDocuments();

    res.render('admin/dashboard', { 
        totalProdutos,
        adminQuery: '?admin=true'
    });
});

// Listar produtos
router.get('/listar', async (req, res) => {
    const tenis = await Tenis.find();

    res.render('admin/listar', { 
        tenis,
        adminQuery: '?admin=true'
    });
});

// Formulário de criação
router.get('/criar', (req, res) => {
    res.render('admin/criar', {adminQuery: '?admin=true'});
});

// Criar produto
router.post('/criar', async (req, res) => {
    const { nome, marca, preco, esporte, imagem, descricao, estoque } = req.body;

    await Tenis.create({
        nome,
        marca,
        preco,
        esporte,
        imagem,
        descricao,
        estoque
    });

    res.redirect('/admin/listar');
});

// Formulário de edição
router.get('/editar/:id', async (req, res) => {
    const item = await Tenis.findById(req.params.id);
    if (!item) return res.redirect('/admin/listar');

    res.render('admin/editar', { item, adminQuery: '?admin=true' });
});

// Editar produto
router.put('/editar/:id', async (req, res) => {
    const { nome, marca, preco, esporte, imagem, descricao, estoque } = req.body;

    await Tenis.findByIdAndUpdate(req.params.id, {
        nome,
        marca,
        preco,
        esporte,
        imagem,
        descricao,
        estoque
    });

    res.redirect('/admin/listar');
});

// Remover produto
router.delete('/remover/:id', async (req, res) => {
    await Tenis.findByIdAndDelete(req.params.id);
    res.redirect('/admin/listar');
});

module.exports = router;
