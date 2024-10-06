const express = require ('express')
const router = express.Router()


// Importar o módulo de conexão com o banco de dados
const db = require('./db');

// Função para criar um novo usuário
async function criarUsuario(req, res) {
  try {
    // Obter os dados do usuário do corpo da requisição
    const { nome, email, senha } = req.body;

    // Verificar se os dados estão presentes
    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'Dados inválidos' });
    }

    // Criar um novo usuário no banco de dados
    const usuario = await db.Usuario.create({
      nome,
      email,
      senha: await hashSenha(senha), // Função para hash da senha
    });

    // Retornar o usuário criado
    return res.status(201).json(usuario);
  } catch (erro) {
    // Tratar erros
    console.error(erro);
    return res.status(500).json({ erro: 'Erro ao criar usuário' });
  }
}

// Função para hash da senha
async function hashSenha(senha) {
  const bcrypt = require('bcrypt');
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(senha, salt);
}

// Exportar a função para criar usuário
module.exports = criarUsuario