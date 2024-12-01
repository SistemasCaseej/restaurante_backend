const Usuario = require("../models/user_model");
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.add_user = async (req, res) => {
  try {
    const validationInputs = validateRequestBodyNewAccount(req.body);

    if (validationInputs) {
      return res.status(400).json(validationInputs);
    }

    if (await checkIfEmailExists(req.body.email)) {
      return res.status(409).json("Email já cadastrado!");
    }

    const { nome, email, senha, isAdmin } = req.body;
    const hash = await hashPassword(senha);
    const novoUsuario = new Usuario({ nome, email, senha: hash, isAdmin });

    await novoUsuario.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login_user = (req, res, next) => {
  passport.authenticate('local', (err, usuario, info) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!usuario) return res.status(401).json({ message: info.message });

    req.logIn(usuario, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: 'Login bem-sucedido', usuario });
    });
  })(req, res, next);
};

exports.list_user = (req, res) => {
  res.status(200).json(req.user);
};

exports.list_all_users = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (err) {
    console.error("Erro ao listar usuários:", err);
    res.status(500).json({ error: "Erro ao listar usuários" });
  }
};


const checkIfEmailExists = async (email) => {
  const existingUser = await Usuario.findOne({ email });
  return !!existingUser;
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateRequestBodyNewAccount = (body) => {
  if (!body.nome || !body.email || !body.senha) {
    return "Todos os campos (nome, email, senha) são obrigatórios!";
  }
  if (!validateEmail(body.email)) {
    return "O e-mail fornecido é inválido!";
  }
  return null;
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};