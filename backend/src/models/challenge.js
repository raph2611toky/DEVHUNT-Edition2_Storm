const mongoose = require("mongoose")

const challengeSchema = mongoose.Schema({
    idClub: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userSender: {
        idSender: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        niveau: {
            type: String,
            required: true
        },
        image: {
            type: String
        }
    },
    listeChallenge :[{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }],
    nomChallenge:{
        type: String,
        required: true
    },
    contenu:{
        description: {
            type: String,
            required: true
        },
        File: {
            type: String,
            required: false
        }
    },
    debut: {
        type: Date
    },
    fin:{
        type: Date
    },
    likes: {
        type: Array
    },
    paricipant:[{
        idParticipant: {
            type: mongoose.Schema.Types.ObjectId
        },
        point: {
            type: Number
        }
    }]
},{
    timestamps: true
}
)
module.exports = mongoose.model('Challenge' , challengeSchema)
