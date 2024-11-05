const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Item = new Schema({

    descricao:{
        type : String,
    },
    preco:{
        type : Number,
        required : true
    },
    imgurl:{
        type : String,
        required : true
    },
    tags:[{
        nome :{
            type : String
        }
    }],
    avaliacao:[{
        user:{
            type: mongoose.Schema.ObjectId,
            ref: 'Usuario',
            required : true,
            unique : true
        },
        nota:{
            type : Number,
            required : true
        },
        comentario:{
            type : String
        }
    }]
    
})

module.exports = mongoose.model("Item", Item)