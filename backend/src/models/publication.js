const mongoose = require('mongoose')

const pubSchema = mongoose.Schema({
    idClub: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sender: {
        idSender: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false
        }
    },
    contenu: {
        description: {
            type: String,
            required: true
        },
        files: [{
            type: String,
            required: false
        }]
    },
    date: {
        type: Date,
        required: true
    },
    likes: {
        type: Array
    },
    reponse: {
        type: Array
    },
    isChallenge: {
        value: {
            type: Boolean,
            required: true
        },
        idChallenge: {
            type: mongoose.Schema.Types.ObjectId
        },
        debut: {
            type: Date
        },
        fin: {
            type: Date
        },
        check: {
            type: Number
        }
    }
}, {
    timestamps: true
})

// pubSchema.methods.isChallenge

module.exports = mongoose.model('publication', pubSchema)