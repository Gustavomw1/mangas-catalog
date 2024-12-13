import { Request, Response, Router } from 'express';
import { AppDataSource } from '../database/data-source';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 

const SECRET = process.env.SECRET;

if (!SECRET) {
    throw new Error('SECRET não está definido no arquivo .env');
}

const db = AppDataSource;
const userRouter = Router();

// Ver usuario
userRouter.get('/profile', async (_req: Request, res: Response) => {
    try {
        const result = await db.query('SELECT * FROM champion.fort;');
        return res.status(200).json({ result });
    } catch (erro) {
        return res.status(500).json({ mensagem: 'Erro ao buscar usuario' });
    }
});

// Cadastrar usuario
userRouter.post('/cadastrar', async (req: Request, res: Response) => {
    const { usuario, password } = req.body;

    if (!usuario || !password) {
        return res.status(400).json({ mensagem: 'Usuario e senha são obrigatorios' });
    }

    try {
        // Hashe senha
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO fort (usuario, password) VALUES (?, ?)';
        await db.query(query, [usuario, hashedPassword]);

        return res.status(201).json({ mensagem: 'Usuario criado' });
    } catch (erro) {
        console.log('Erro ao cadastrar usuario:', erro);
        return res.status(500).json({ mensagem: 'Erro ao cadastrar usuario', erro });
    }
});

// Login || jwt
userRouter.post('/login', async (req: Request, res: Response) => {
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

        const senhaCorreta = await bcrypt.compare(password, usuarioDB.password);

        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Senha incorreta' });
        }

        // Gerar jwt
        const token = jwt.sign({ id: usuarioDB.id }, SECRET, { expiresIn: '1h' });

        return res.status(200).json({ mensagem: 'Usuario logado com sucesso', token });
    } catch (erro) {
        console.log('Erro ao logar usuario:', erro);
        return res.status(500).json({ mensagem: 'Erro ao logar usuario', erro });
    }
});

// Deletar
userRouter.delete('/profile/:id', async (req: Request, res: Response) => {
    const { id } = req.params; // Usar req.params.id para pegar o parâmetro de URL

    try {
        await db.query('DELETE FROM fort WHERE id = ?', [id]);
        return res.status(200).json({ mensagem: 'Usuario deletado com sucesso' });
    } catch (erro) {
        return res.status(500).json({ mensagem: 'Erro ao deletar usuario' });
    }
});

export default userRouter;
