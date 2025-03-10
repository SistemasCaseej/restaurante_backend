const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Usuario =  new Schema({

    nome:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    isAdmin:{
        type:Boolean,
        default:0
    },
    senha:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model("Usuario", Usuario)