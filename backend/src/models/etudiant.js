const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const schemaEtudiant = mongoose.Schema({
    nomComplet:{
        type: String,
        required: true
    },
    pseudo: {
        type:String,
        required: true
    },
    matricule:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    niveau: {
        type: String, 
        required: true
    } ,
    image:{
        type: String,
    }
    ,
    isAdmin: {
        type:Boolean ,
        default: false,
        required: true
    },
    listeChallenge: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    tokens: [{
        authToken: {
            type: String,
            required: true
        }
    }]
},
{
    timestamps: true
})

schemaEtudiant.pre("save", async function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    const hassPass = await bcrypt.hashSync(this.password, 10);
    return (this.password = hassPass)
   
});

schemaEtudiant.pre("updateOne", async function(next) {
    if(!this._update.password) {
        const hassPass = await bcrypt.hashSync(this._update.password, 10);
         this.password = hassPass
    }
    return next();
});

schemaEtudiant.methods.verifyPassword = function(plaintext){
    return bcrypt.compareSync(plaintext, this.password)
}

// generate a new token and save user 
schemaEtudiant.methods.generateTokenAndSaveUser = async function() {
    const authToken = jwt.sign({
        _id: this._id.toString() 
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.ONE_DAYS
    })
    this.tokens.push({ authToken })
    await this.save()
    return authToken
}


module.exports = mongoose.model('Etudiant user',schemaEtudiant) 