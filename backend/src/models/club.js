const mongoose = require('mongoose')

const clubSchema = mongoose.Schema({
    membresStaff: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }],
    nom: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('club', clubSchema)