const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    dataCriacao: { type: Date, default: Date.now }
});

// ✅ SEM next
UserSchema.pre('save', async function () {
    if (!this.isModified('senha')) return;

    this.senha = await bcrypt.hash(this.senha, 10);
});

// Método para comparar senhas
UserSchema.methods.compararSenha = function (senhaCandidata) {
    return bcrypt.compare(senhaCandidata, this.senha);
};

module.exports = mongoose.model('User', UserSchema);