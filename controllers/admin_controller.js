const Usuario = require("../models/user_model");
const Produto = require("../models/item_model")

exports.list_all_users = async (req, res) => {
    try {
      const usuarios = await Usuario.find();
      res.status(200).json(usuarios);
    } catch (err) {
      console.error("Erro ao listar usuários:", err);
      res.status(500).json({ error: "Erro ao listar usuários" });
    }
  };

exports.add_item = async (req, res) => {
    try{
        const validationInputs = validarItem(req.body);
        if(validationInputs){
            return res.status(409).json(validationInputs);
        }
        const produto =  new Produto(req.body);
        await produto.save()
        res.status(201).json({ message: 'Produto registrado com sucesso', produto});
    }catch (err) {
        console.error('Erro ao salvar produto:', err);
        res.status(500).json({ error: 'Erro ao salvar produto' });
    }
}

function validarItem(item) {
    try {
        if(validarPreco(item.preco)){
            return validarPreco(item.preco);
        }
        if(validarDescricao(item.descricao)){
            return validarDescricao(item.descricao);
        }
        if(validarTags(item.tags)){
            return validarTags(item.tags)
        }
        if(validarImgUrl(item.imgurl)){
            return validarImgUrl(item.imgurl)
        }
        return null
    } catch (error) {
        return `erro: ${error}`;
    }
}


function validarDescricao(descricao) {
    if (!descricao || descricao.length<10) {
        return 'Descrição deve ter pelo menos 10 caracteres!'
    }
}

function validarPreco(preco) {
    if (preco === undefined || preco === null || typeof preco !== 'number' || preco <= 0) {
        return 'Preço inválido! Deve ser um número maior que zero.';
    }
}

function validarImgUrl(imgurl) {
    const urlRegex = /^(https?:\/\/)?([\w\d\-]+\.)+\w{2,}(\/.*)?$/;
    if (!imgurl || typeof imgurl !== 'string' || !urlRegex.test(imgurl)) {
        return 'URL da imagem inválida!';
    }
}

function validarTags(tags) {
    if (!Array.isArray(tags) || tags.some(tag => !mongoose.isValidObjectId(tag))) {
        return 'Tags inválidas! Devem ser uma lista de IDs válidos.';
    }
}
