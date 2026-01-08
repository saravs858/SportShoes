const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');

// Todas as rotas aqui usam o middleware isAdmin
router.use(isAdmin);

// Dashboard Admin
router.get('/', (req, res) => {
    res.render('admin/dashboard', { 
        totalProdutos: global.tenisData.length,
        adminQuery: '?admin=true'
    });
});

// Listar produtos para gestão
router.get('/listar', (req, res) => {
    res.render('admin/listar', { 
        tenis: global.tenisData,
        adminQuery: '?admin=true'
    });
});

// Formulário de criação
router.get('/criar', (req, res) => {
    res.render('admin/criar', { adminQuery: '?admin=true' });
});

// Processar criação
router.post('/criar', (req, res) => {
    const { nome, marca, preco, esporte, imagem, descricao, estoque } = req.body;
    const novoTenis = {
        id: Date.now().toString(),
        nome,
        marca,
        preco: parseFloat(preco),
        esporte,
        imagem,
        descricao,
        estoque: parseInt(estoque)
    };
    global.tenisData.push(novoTenis);
    res.redirect('/admin/listar?admin=true');
});

// Formulário de edição
router.get('/editar/:id', (req, res) => {
    const item = global.tenisData.find(t => t.id === req.params.id);
    if (!item) return res.redirect('/admin/listar?admin=true');
    
    res.render('admin/editar', { item, adminQuery: '?admin=true' });
});

// Processar edição
router.put('/editar/:id', (req, res) => {
    const index = global.tenisData.findIndex(t => t.id === req.params.id);
    if (index !== -1) {
        const { nome, marca, preco, esporte, imagem, descricao, estoque } = req.body;
        global.tenisData[index] = {
            ...global.tenisData[index],
            nome,
            marca,
            preco: parseFloat(preco),
            esporte,
            imagem,
            descricao,
            estoque: parseInt(estoque)
        };
    }
    res.redirect('/admin/listar?admin=true');
});

// Remover produto
router.delete('/remover/:id', (req, res) => {
    global.tenisData = global.tenisData.filter(t => t.id !== req.params.id);
    res.redirect('/admin/listar?admin=true');
});

module.exports = router;
