const mongoose = require('mongoose')

const listeEtudiantSchema = mongoose.Schema({
    nomComplet: {
        type: String,
        required: true
    },
    matricule: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('liste etudiant', listeEtudiantSchema)