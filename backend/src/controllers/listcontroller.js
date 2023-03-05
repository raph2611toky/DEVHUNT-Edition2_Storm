const listEtudiant = require("../models/listeEtudiants")

module.exports = {
    async createList (req , res){
        try {
            const newlisteEtudiant = await listEtudiant.create({
                nomComplet : req.body.nomComplet,
                matricule : req.body.matricule
            })
            const  savelistEtudiant = await newlisteEtudiant.save()
            return res.status(200).json(savelistEtudiant)
        } catch (error) {
            console.log(error)
            res.status(500).json('error')
        }
       
    }
}