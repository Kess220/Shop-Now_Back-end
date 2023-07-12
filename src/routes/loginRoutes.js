import express from "express";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";

import { getDB } from "../models/db.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
dotenv.config();

// Rota de login
router.post("/", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const db = getDB();

    // Verificar se o e-mail está cadastrado no banco de dados
    const user = await db.collection("usuarios").findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "E-mail não cadastrado." });
    }

    // Comparar a senha enviada com a senha armazenada no banco de dados
    const senhaCorreta = await compare(senha, user.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    // Gerar um token de autenticação
    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Retornar a resposta de sucesso com o token
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Erro ao acessar o banco de dados:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// Rota para obter os dados do usuário logado
router.get("/dados", authMiddleware, async (req, res) => {
  try {
    const db = getDB();

    // Consultar o banco de dados para obter os dados do usuário
    const user = await db
      .collection("usuarios")
      .findOne({ _id: new ObjectId(req.userId) });

    if (!user) {
      return res.status(401).json({ error: "Usuário não autorizado." });
    }

    const { nome, email, foto } = user;
    return res.status(200).json({ nome, email, foto });
  } catch (error) {
    console.error("Erro ao acessar o banco de dados:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

export default router;
