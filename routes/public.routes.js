const express = require('express');
const router = express.Router();
const Tenis = require('../models/Tenis');

// Home - Listagem de tênis com filtro opcional
router.get('/', async (req, res) => {
  try {
    const { esporte } = req.query;

    let filtro = {};
    if (esporte) {
      filtro.esporte = esporte;
    }

    const tenis = await Tenis.find(filtro);

    res.render('home', {
      tenis: tenis || [],
      esporteSelecionado: esporte || 'Todos',
      isAdmin: req.query.admin === 'true'
    });
  } catch (err) {
    console.error('Erro na home:', err);

    res.render('home', {
      tenis: [],
      esporteSelecionado: 'Todos',
      isAdmin: false
    });
  }
});

// Detalhes do tênis
router.get('/tenis/:id', async (req, res) => {
  try {
    const item = await Tenis.findById(req.params.id);

    if (!item) {
      return res.status(404).render('error', {
        message: 'Tênis não encontrado',
        error: { status: 404 }
      });
    }

    res.render('detalhes', {
      item,
      isAdmin: req.query.admin === 'true'
    });
  } catch (err) {
    console.error('Erro ao buscar tênis:', err);

    res.status(500).render('error', {
      message: 'Erro ao buscar o tênis',
      error: { status: 500 }
    });
  }
});

module.exports = router;