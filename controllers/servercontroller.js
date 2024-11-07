const Usuario = require("../models/user_model");

exports.getServerMessage = (req, res) => {
    res.status(200).send("Server is running!");
};

exports.add_user = async (req, res) => {
    try {
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.status(200).json(usuario);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.find_user = (req, res) => {
    Usuario.findOne({ nome: req.params.nome })
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
};