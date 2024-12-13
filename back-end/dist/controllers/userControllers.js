"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_source_1 = require("../database/data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = process.env.SECRET;
if (!SECRET) {
    throw new Error('SECRET não está definido no arquivo .env');
}
const db = data_source_1.AppDataSource;
const userRouter = (0, express_1.Router)();
// Ver usuario
userRouter.get('/profile', async (_req, res) => {
    try {
        const result = await db.query('SELECT * FROM champion.fort;');
        return res.status(200).json({ result });
    }
    catch (erro) {
        return res.status(500).json({ mensagem: 'Erro ao buscar usuario' });
    }
});
// Cadastrar usuario
userRouter.post('/cadastrar', async (req, res) => {
    const { usuario, password } = req.body;
    if (!usuario || !password) {
        return res.status(400).json({ mensagem: 'Usuario e senha são obrigatorios' });
    }
    try {
        // Hashe senha
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const query = 'INSERT INTO fort (usuario, password) VALUES (?, ?)';
        await db.query(query, [usuario, hashedPassword]);
        return res.status(201).json({ mensagem: 'Usuario criado' });
    }
    catch (erro) {
        console.log('Erro ao cadastrar usuario:', erro);
        return res.status(500).json({ mensagem: 'Erro ao cadastrar usuario', erro });
    }
});
// Login || jwt
userRouter.post('/login', async (req, res) => {
    const { usuario, password } = req.body;
    if (!usuario || !password) {
        return res.status(400).json({ mensagem: 'Usuario e senha são obrigatorios' });
    }
    try {
        const result = await db.query('SELECT * FROM fort WHERE usuario = ?', [usuario]);
        if (result.length === 0) {
            return res.status(404).json({ mensagem: 'Usuario não encontrado' });
        }
        const usuarioDB = result[0];
        const senhaCorreta = await bcrypt_1.default.compare(password, usuarioDB.password);
        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Senha incorreta' });
        }
        // Gerar jwt
        const token = jsonwebtoken_1.default.sign({ id: usuarioDB.id }, SECRET, { expiresIn: '1h' });
        return res.status(200).json({ mensagem: 'Usuario logado com sucesso', token });
    }
    catch (erro) {
        console.log('Erro ao logar usuario:', erro);
        return res.status(500).json({ mensagem: 'Erro ao logar usuario', erro });
    }
});
// Deletar
userRouter.delete('/profile/:id', async (req, res) => {
    const { id } = req.params; // Usar req.params.id para pegar o parâmetro de URL
    try {
        await db.query('DELETE FROM fort WHERE id = ?', [id]);
        return res.status(200).json({ mensagem: 'Usuario deletado com sucesso' });
    }
    catch (erro) {
        return res.status(500).json({ mensagem: 'Erro ao deletar usuario' });
    }
});
exports.default = userRouter;
