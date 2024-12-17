const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema({
    descricao: {
        type: String,
        required: true,
        minlength: 10
    },
    preco: {
        type: Number,
        required: true,
    },
    imgurl: {
        type: String,
        required: true
    },
    tags: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Tag'
    }]
});

module.exports = mongoose.model('Item', Item);
