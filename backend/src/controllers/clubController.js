const etudiantSchema = require('../models/etudiant')
const clubSchema = require('../models/club')

module.exports = {
    async createClub  (req, res){
        try {
            const membresStaff  = req.body.membresStaff
            console.log(membresStaff);
            const nom = req.body.nomClub
            const description = req.body.description
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
            } else{
                var filename = ''
            }
            const createNewClub = await clubSchema.create({
                membresStaff: membresStaff,
                nom: nom,
                description: description,
                logo: filename
            })
            const newClub = await createNewClub.save()
            return res.status(201).json(newClub)
        } catch (e) {
            console.log(e)
            return res.status(500).json("erreur")
        }
    },
    async addMembersStaff (req, res){
        try {
            const { idMembreIn, idClub, membresStaff } = req.body
            const clubFound = await clubSchema.findById(idClub)
            const isClubMembers = await clubFound.membres.includes(idMembreIn)
            if(!isClubMembers){
                console.log('only member can add an other member')
            }
            for(let i=0; i < membresStaff.length; i++){
                clubFound.updateOne({
                    $push: {
                        membresStaff: membresStaff[i]
                    }
                })
            }
            const saveClub = await clubSchema.findById(idClub)
            return res.status(201).json(saveClub)
        } catch (e) {
            console.log(e)
            return res.status(500).json('erreur')
        }
    },
    async updateClub (req, res){
        try {
            const idClub = req.params.id
            const nom = req.body.nom
            const idMembreIn = req.body.membresStaff
            const clubFound = await clubSchema.findById(idClub)
            if(req.files){
                const image = req.files.image
                var filename = images.name
                image.mv('./src/uploads/'+filename,  function(err){
                    if(err){
                        console.log('erreur d\'envoie d\'image'+err)
                    } else{
                        console.log('file uploaded...')
                    }
                })
            } else{
                var filename = clubFound.logo
            }
            const isClubStaffMembers = await clubFound.membresStaff.includes(idMembreIn)
            if(!isClubStaffMembers){
                console.log('only for staff members');
                return res.status(403).json('erreur')
            }
            const updateClub = await clubFound.updateOne({
                    nom: nom,
                    logo: filename
            })
            console.log("updated successfully....")
            const saveClub = await clubSchema.findById(idClub)
            return res.status(201).json(saveClub)
        } catch (e) {
            console.log(e)
            return res.status(500).json('erreur')
        }
    },
    async getAllClub (req, res){
        try {
            const allClub = await clubSchema.find()
            if(!allClub){
                console.log('no one club was found');
            }
            return res.status(200).json(allClub)
        } catch (e) {
            console.log(e)
            return res.status(500).json('erreur')
        }
    }
}