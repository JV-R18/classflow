const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Cadastrar novo usuário
router.post('/register', async (req, res) => {
    const { nome, senha, tipo } = req.body;
    try {
        const user = new User({ nome, senha, tipo });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao cadastrar' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { nome, senha } = req.body;
    try {
        const user = await User.findOne({ nome, senha });
        if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao logar' });
    }
});

// Atualizar disponibilidade
router.put('/:id/disponibilidade', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { disponibilidade: req.body.disponibilidade }, { new: true });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar' });
    }
});

// Listar todos os usuários
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}, { nome: 1, tipo: 1, disponibilidade: 1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

module.exports = router;
