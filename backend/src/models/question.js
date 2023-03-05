const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        idUser: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        pseudo: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false
        },
        niveau:{
            type: String,
            required: true,
        }
    },
    contenu: {
        description: {
            type: String,
            required: true
        },
        fichiers: [{
            type: String
        }]
    },
    vue: {
        type: Number,
    },
    date: {
        type: String,
        required: true,
        default: Date.now()
    },
    liens: {
        type: Array,
        required: false
    },
    reponse: {
        type: Array,
        required: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('question', questionSchema)