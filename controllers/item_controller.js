const Item = require ("../models/item_model");

exports.getServerMessage = (req, res) => {
    res.status(200).send("Server is running!");
};

exports.add_Item = async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json(err.message);
    }
};

exports.find_Item = (req, res) => {
    Item.findOne({descricao: req.params.item })
        .then(Item => {
            res.status(200).json(Item);
        })
        .catch(err => { 
            res.status(500).json(err.message);

        });
};