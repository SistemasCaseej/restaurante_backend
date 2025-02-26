const Avaliacao = require('../models/Avaliacao');
const Produto = require('../models/item_model');

exports.list_user = (req, res) => {
  res.status(200).json(req.user);
};

exports.add_avaliacao = async (req, res) =>{
    try {
        const avaliacao = new Avaliacao(req.body)
        await avaliacao.save();
        res.status(200).json({message: 'Avaliação criada com sucesso', avaliacao});
    } catch (error) {
        console.error("Erro ao adicionar avaliação", err);
        res.status(500).json({error : "Erro ao criar avaliação"})
    }
}
