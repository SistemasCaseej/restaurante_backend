const Usuario = require("../models/user_model");
const Produto = require("../models/item_model");
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

exports.list_all_products = async (req, res) => {
    try{
        const produtos = await Produto.find()
        res.status(200).json(produtos);
    } catch(err){
        console.error("Erro ao listar produtos", err)
        res.status(500).json({error: "Erro ao listar produto"})
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



exports.delete_item = async (req, res) => {
    try {
        const { id } = req.params;

        // Certifique-se de que o ID é um formato válido de ObjectId do MongoDB
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const result = await Produto.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Produto não encontrado" });
        }

        res.status(200).json({ message: "Produto deletado com sucesso" });
    } catch (err) {
        console.error("Erro ao deletar produto:", err);
        res.status(500).json({ error: "Erro ao deletar produto" });
    }
};


exports.edit_item = async (req, res) => {
    try {
        const {id} = req.params;
        const updates = req.body;

        const errosValidacao = validarItem(updates);
        if (errosValidacao) {
            return res.status(409).json({ erros: errosValidacao });
        }

        const item = await Produto.findById(id);
        if (!item) {
            return res.status(404).json({ error: "Item não encontrado" });
        }

        Object.keys(updates).forEach(key => {
            item[key] = updates[key];
        });

        const itemAtualizado = await Produto.save();
        res.status(200).json({ message: "Item atualizado com sucesso", itemAtualizado });
    } catch (err) {
        console.error("Erro ao editar item:", err);
        res.status(500).json({ error: "Erro ao editar item" });
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
