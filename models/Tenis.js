const mongoose = require('mongoose');

const TenisSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    marca: { type: String, required: true },
    preco: { type: Number, required: true },
    esporte: { type: String, required: true }, // Ex: Corrida, Basquete, Casual
    imagem: { type: String, required: true }, // URL da imagem
    descricao: { type: String, required: true },
    estoque: { type: Number, default: 0 },
    dataCriacao: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tenis', TenisSchema);
