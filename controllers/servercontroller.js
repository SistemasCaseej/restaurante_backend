const Usuario = require("../models/user_model");
const bcrypt = require('bcrypt');

exports.getServerMessage = (req, res) => {
    res.status(200).send("Server is running!");
};

exports.add_user = async (req, res) => {
    try {
        const validationInputs = validateRequestBodyNewAccount(req.body);
        if(validationInputs){
            return res.status(400).json(validationInputs);
        }

        if(await checkIfEmailExists(req.body.email)){
            return res.status(409).json("Email já cadastrado!")
        }

        const savedUser = await saveNewUser(req.body);
        return res.status(200).json({id:savedUser._id})

    } catch (err) {
        res.status(500).json(err.message);
    }
};

//exports.find_user = (req, res) => {
//    Usuario.findOne({ nome: req.params.nome })
//        .then(user => {
//            res.status(200).json(user);
//        })
//        .catch(err => {
//            res.status(500).json(err.message);
//        });
//};

const checkIfEmailExists = async (email) => {
    const existingUser = await Usuario.findOne({ email });
    return !!existingUser;
};

const saveNewUser = async (userData) => {
    userData.senha = await hashPassword(userData.senha);
    const usuario = new Usuario(userData);
    return await usuario.save();
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