const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tag = new Schema({
    nome: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Tag', Tag);
