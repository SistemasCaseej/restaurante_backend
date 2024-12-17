const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AvaliacaoSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'Usuario',
        required: true,
        unique:false
    },
    item: {
        type: mongoose.Schema.ObjectId,
        ref: 'Item',
        required: true,
    },
    nota: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comentario: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true // Para incluir createdAt e updatedAt automaticamente
});

module.exports = mongoose.model('Avaliacao', AvaliacaoSchema);
