const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemUser = new Schema({
    user:{
        type : mongoose.Schema.ObjectId,
        ref : 'Usuario',
        required : true
    },
    items:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Item'

    }],
    valortotal:{
        type : Number
    }
})

module.exports = mongoose.model("ItemUser", ItemUser)