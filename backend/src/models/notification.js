const mongoose = require("mongoose")

const notificationSchema = mongoose.Schema({
    receiver:[{
        type:mongoose.Schema.Types.ObjectId,
        required: true
    }],
    sender:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        image :{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        niveau: {
            type: String,
            required: false
        }
    },
    idPub:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    texte:{
        Type: String,
      
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('notification', notificationSchema)