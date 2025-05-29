const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nome: String,
    senha: String,
    tipo: String,
    disponibilidade: Object
});

module.exports = mongoose.model('User', UserSchema);
