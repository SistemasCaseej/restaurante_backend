const Usuario = require("../models/user_model");
const Item = require('../models/item_model');
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
      userId = usuario._id;
      res.status(200).json({ message: 'Login bem-sucedido', userId });
    });
  })(req, res, next);
};

exports.list_itens = async (req, res) => {
    try{
        const itens = await Item.find();
        if(!itens || itens.length === 0){
            res.status(200).json("Vishhh... parece que não temos itens em estoque no momento :(");
        }
        res.status(200).json(itens);
    }catch(err){
        res.status(500).json({error: err});
    }
}


const checkIfEmailExists = async (email) => {
  const existingUser = await Usuario.findOne({ email });
  return !!existingUser;
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateSenha = (senha) => {
  if (senha.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres.";
  }

  const hasUpperCase = /[A-Z]/.test(senha);
  const hasLowerCase = /[a-z]/.test(senha);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

  if (!hasUpperCase) {
    return "A senha deve conter pelo menos uma letra maiúscula.";
  }
  if (!hasLowerCase) {
    return "A senha deve conter pelo menos uma letra minúscula.";
  }
  if (!hasSpecialChar) {
    return "A senha deve conter pelo menos um caractere especial.";
  }

  return null;
};


const validateRequestBodyNewAccount = (body) => {
  if (!body.nome || !body.email || !body.senha) {
    return "Todos os campos (nome, email, senha) são obrigatórios!";
  }
  if (!validateEmail(body.email)) {
    return "O e-mail fornecido é inválido!";
  }
  const senhaError = validateSenha(body.senha);
  if(senhaError){
    return senhaError
  }

  return null;
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};