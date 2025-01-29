const Usuario = require("../models/user_model");
const Produto = require("../models/item_model");
const Tag = require("../models/tag_model")
const Avaliacao = require("../models/Avaliacao")
const mongoose = require('mongoose');

exports.list_all_users = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (err) {
        console.error("Erro ao listar usuários:", err);
        res.status(500).json({ error: "Erro ao listar usuários" });
    }
};

exports.add_avaliacao = async (req, res) =>{
    try {
        const avaliacao = new Avaliacao(req.body)
        await avaliacao.save();
        res.status(200).json(avaliacao);
    } catch (error) {
        console.error("Erro ao adicionar avaliação", err);
        res.status(500).json({error : "Erro ao criar avaliação"})
    }
}

exports.add_tag = async (req, res) =>{

    try {
        const tags = new Tag(req.body);
        await tags.save();
        res.status(201).json({message : 'Tag Criada com sucesso'})
    } catch (error) {
        console.error('Erro ao salvar Tag')
    }
}

exports.add_item = async (req, res) => {
    try {
        const errosValidacao = validarItem(req.body);
        if (errosValidacao) {
            return res.status(409).json({ erros: errosValidacao });
        }

        const produto = new Produto(req.body);
        await produto.save();
        res.status(201).json({ message: 'Produto registrado com sucesso', produto });
    } catch (err) {
        console.error('Erro ao salvar produto:', err);
        res.status(500).json({ error: 'Erro ao salvar produto' });
    }
};

function validarItem(item) {
    try {
        const erros = [];
        
        const erroPreco = validarPreco(item.preco);
        if (erroPreco) erros.push(erroPreco);

        const erroQuant = validarQuantidade(item.quantidade);
        if(erroQuant) erros.push(erroQuant);

        const erroDescricao = validarDescricao(item.descricao);
        if (erroDescricao) erros.push(erroDescricao);

        const erroTags = validarTags(item.tags);
        if (erroTags) erros.push(erroTags);

        const erroImgUrl = validarImgUrl(item.imgurl);
        if (erroImgUrl) erros.push(erroImgUrl);

        return erros.length > 0 ? erros : null;
    } catch (error) {
        return [`Erro interno na validação: ${error}`];
    }
}

function validarDescricao(descricao) {
    if (!descricao || descricao.length < 10) {
        return 'Descrição deve ter pelo menos 10 caracteres!';
    }
    return null;
}

function validarPreco(preco) {
    if (preco === undefined || preco === null || typeof preco !== 'number' || preco <= 0) {
        return 'Preço inválido! Deve ser um número maior que zero.';
    }
    return null;
}

function validarQuantidade(quantidade) {
    if (quantidade === undefined || quantidade === null || typeof quantidade !== 'number' || quantidade <= 0) {
        return 'Quantidade inválida! Deve ser um número maior que zero.';
    }
    return null;
}

function validarImgUrl(imgurl) {
    const urlRegex = /^(https?:\/\/)?([\w\d\-]+\.)+\w{2,}(\/.*)?$/;
    if (!imgurl || typeof imgurl !== 'string' || !urlRegex.test(imgurl)) {
        return 'URL da imagem inválida!';
    }
    return null;
}

function validarTags(tags) {
    if (!Array.isArray(tags) || tags.some(tag => !mongoose.isValidObjectId(tag))) {
        return 'Tags inválidas! Devem ser uma lista de IDs válidos.';
    }
    return null;
}
