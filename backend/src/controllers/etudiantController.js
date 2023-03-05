const { update } = require("../models/etudiant");
const etudiantSchema = require("../models/etudiant");
const listEtudiant = require("../models/listeEtudiants");

module.exports = {
    async updateEtudiant (req , res){
        try { 
            let id_etudiant = req.params.id
            const etudiantFound = await etudiantSchema.findById(id_etudiant)
            if(!etudiantFound){
                return res.status(403).json('etudiant not found')
            }
            if(req.files){
                const image = req.files.image
                var filename = image.name
                image.mv('./src/uploads/'+filename,  function(err){
                    if(err){
                        console.log('erreur d\'envoie d\'image'+err)
                    } else{
                        console.log('file uploaded...')
                    }
                })
                var etudiantupdate =  await etudiantFound.updateOne({
                    pseudo: req.body.pseudo,
                    email: req.body.email,
                    password : req.body.password,
                    niveau: req.body.niveau,
                    image: filename
                })
            } else{
                var etudiantupdate =  await etudiantFound.updateOne({
                    pseudo: req.body.pseudo,
                    email: req.body.email,
                    password : req.body.password,
                    niveau:req.body.niveau
                })
            }
            const saveEtudiant = await etudiantSchema.findById(id_etudiant)
            return res.status(202).json(saveEtudiant)
        } catch (error) {
            console.log(error);
            return res.status(500).json("Update failed")
        }  
    },
    async getOneEtudiant (req , res){
        try {
            const idEtudiant = req.params.id
            const etudiantFound = await etudiantSchema.findById(idEtudiant)
            if(etudiantFound){
                return res.status(200).json(etudiantFound)
            } else{
                return res.status(403).json('Etudiant not fount')
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json("Etudiant not found")
        }
    },
    async getAllEtudiant (req, res){
        try {
            const allEtudiant = await etudiantSchema.find()
            if(!allEtudiant){
                console.log("no etudiant was found");
            }
            return res.status(200).json(allEtudiant)
        } catch (e) {
            console.log(e)
            return res.status(500)
        }
    },
    async deleteEtudiant (req, res){
        try {
            const idAdmin = req.body.userId
            const isAdminccheck = await etudiantSchema.findById(idAdmin)
            const idOfEtudiant = req.params.id          
            const etudiantFound = await etudiantSchema.findById(idOfEtudiant)   
            if(isAdminccheck.isAdmin !== true){
              return res.status(403).json("Only admin can delete user")
            }         
            const etudianDelete = await etudiantFound.deleteOne()
            return res.status(200).json("User has been deleted succesfully")             
        } catch (error) {
            console.log(error)
            return res.status(500).json("User has not been deleted , Please try egain")
        }      
    }
}