
const challengeSchema = require('../models/challenge')
const clubSchema = require("../models/club")

module.exports = {
    async getClubChallenge (req , res){
        try {
            const clubId = req.body.clubId
            const pubFound = await clubSchema.findById(clubId)
            if(pubFound){
                const challengeFound = await challengeSchema.find({
                    idClub : pubFound._id
                })
                return res.status(200).json(challengeFound)
            }
            return res.status(403).json("No challenge found")
            
        } catch (error) {
            console.log(error)
            return res.status(500).json("Error , Please try again!")
        }
    },

     async getOnechallenge (req , res){
        try {
            const idChallenge = req.params.id
            const challengeFound = await challengeSchema.findById(idChallenge)
            if(challengeFound){
                return res.status(200).json(challengeFound)
            }
            return res.status(403).json("Challenge not found")
        } catch (e) {
            console.log(e)
            return res.status(500).json("Error... Please try egain")
        }
    },
    async likePublication (req, res){
        try {
            const { idEtudiant } = req.body.idEtudiant
         const challengeFound = await challengeSchema.findById(req.params.id)
         if(!challengeFound.likes.includes(idEtudiant)){
          await challengeFound.updateOne({$push:{likes: req.body.userId}})
         } else{
          await challengeFound.updateOne({$pull:{likes: req.body.userId}})
        }
        const saveChallenge = await challengeSchema.findById(challengeFound._id)
        return res.status(200).json(saveChallenge)
        } catch (e) {
          res.status(500).json("Error, Please try egain");
        }
    },
    async getAllChallenge (req, res){
        try {
            const allChallenge = await challengeSchema.find()
            if(!allChallenge){
                console.log('no challenge')
                return res.status(404)
            }
            return res.status(200).json(allChallenge)
        } catch (e) {
            console.log(e)
            return res.status(500).json("Error... Please try egain")
        }
    }
}