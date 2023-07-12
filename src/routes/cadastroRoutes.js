import express from "express";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { getDB } from "../models/db.js";

const router = express.Router();

// Rota para cadastrar um novo usuário
router.post("/", async (req, res) => {
  const { nome, email, senha, confirmarSenha, foto } = req.body;

  try {
    // Validar os campos obrigatórios
    if (!nome || !email || !senha || !confirmarSenha || !foto) {
      return res
        .status(422)
        .json({ error: "Todos os campos são obrigatórios." });
    }

    // Validar o comprimento mínimo da senha
    if (senha.length < 3) {
      return res
        .status(422)
        .json({ error: "A senha deve ter no mínimo três caracteres." });
    }

    // Validar a correspondência das senhas
    if (senha !== confirmarSenha) {
      return res.status(422).json({ error: "As senhas não coincidem." });
    }

    const db = getDB();

    // Verificar se o email já está sendo utilizado
    const existingUser = await db.collection("usuarios").findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "Este email já está sendo utilizado." });
    }

    // Realizar a criptografia da senha
    const hashedSenha = await bcrypt.hash(senha, 10);

    // Criar um novo objeto ObjectId para o ID do usuário
    const userId = new ObjectId();

    // Realizar o cadastro do usuário no banco de dados
    await db.collection("usuarios").insertOne({
      _id: userId,
      nome,
      email,
      senha: hashedSenha,
      foto,
    });

    return res.status(201).json({ message: "Usuário cadastrado com sucesso." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao cadastrar usuário." });
  }
});

export default router;
