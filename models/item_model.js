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
        min:0
    },
    imgurl: {
        type: String,
        required: true
    },
    tags: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Tag'
    }],
    quantidade:{
        type:Number,
        required:true,
        default:0,
        min:0
    }
});

module.exports = mongoose.model('Item', Item);
