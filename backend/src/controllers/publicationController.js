const pubSchema = require('../models/publication')
const challengeSchema = require('../models/challenge')
const clubSchema = require('../models/club')
const etudiantSchema = require('../models/etudiant')
const notificationSchema = require('../models/notification')

module.exports = {
    async createPublicationCours (req, res){
        try {
            const { idClub, idSender, description } = req.body
            if(req.files){
                console.log(req.files.length);
                if(req.files.length === undefined){
                    const image = req.files.file
                    var filename = image.name
                    image.mv('./src/uploads/'+filename,  function(err){
                        if(err){
                            console.log('erreur d\'envoie d\'image'+err)
                        } else{
                            console.log('file uploaded...')
                        }
                    })
                    console.log(`in one file :   ${filename}`);
                } else{
                    var filename = []
                    for(let i=0; i<req.files.length; i++){
                        const image = req.files[i]
                        const nomFile = image.name
                        filename.push(nomFile)
                        image.mv('./src/uploads/'+filename,  function(err){
                            if(err){
                                console.log('erreur d\'envoie d\'image'+err)
                            } else{
                                console.log('file uploaded...')
                            }
                        })
                    }
                    console.log(`files in many:   ${filename}`);
                }
            } else{
                var filename = ''
            }
            const etudiantFound = await etudiantSchema.findById(idSender)
            if(!etudiantFound){
                console.log('etudiant not found')
            }
            const createNewPub = await pubSchema.create({
                idClub: idClub,
                sender: {
                    idSender: etudiantFound._id,
                    name: etudiantFound.pseudo,
                    image: etudiantFound.image
                },
                contenu: {
                    description: description,
                    files: filename
                },
                date: Date.now(),
                isChallenge: {
                    value: false
                }
            })
            const newPub = await createNewPub.save()
            const clubFound = await clubSchema.findById(idClub)
            const createNewNotification = await notificationSchema.create({
                sender: {
                    id: clubFound._id,
                    image: clubFound.logo,
                    name: clubFound.nom
                },
                idPub: newPub._id,
                texte: `Le club ${clubFound.nom} a une nouvelle publication`
            })
            for(let i=0; i<clubFound.membresEtudiant.length; i++){
                newNotification.receiver.push(clubFound.membresEtudiant[i])
            }
            const newNotification = await createNewNotification.save()
            return res.status(201).json({newPub, newNotification})
        } catch (e) {
            console.log(e);
            return res.status(500).json('erreur in catch')
        }
    },
    async createNewChallenge (req, res){
        try {
            const { idClub, idEtudiant, nomChallenge, description, debut, fin } = req.body
            if(req.files){
                const image = req.files.file
                    var filename = image.name
                    image.mv('./src/uploads/'+filename,  function(err){
                        if(err){
                            console.log('erreur d\'envoie d\'image'+err)
                        } else{
                            console.log('file uploaded...')
                        }
                    })
                    console.log(`in one file :   ${filename}`);
            }{
                var filename = ''
            }
            const etudiantFound = await etudiantSchema.findById(idEtudiant)
            const clubFound = await clubSchema.findById(idClub)
            const isStaffMembers = await clubFound.membresStaff.includes(etudiantFound._id)
            if(!isStaffMembers){
                console.log('vous n\'etes pas staff')
                return res.status(403)
            }
            const createNewChallenge = await challengeSchema.create({
                idClub: idClub,
                userSender: {
                    idSender: etudiantFound._id,
                    name: etudiantFound.pseudo,
                    niveau: etudiantFound.niveau,
                    image: etudiantFound.image
                },
                nomChallenge: nomChallenge,
                contenu: {
                    description: description,
                    file: filename
                },
                debut: debut,
                fin: fin
            })
            const newChallenge = await createNewChallenge.save()
            return res.status(201).json(newChallenge)
        } catch (e) {
            console.log(e);
            return res.status(500).json('erreur in catch')
        }
    },
    async createNewChallengeEdition (req, res){
        try {
            const { idChallenge, idSender, description, debut, fin } = req.body
            if(req.files){
                const image = req.files.file
                var filename = image.name
                image.mv('./src/uploads/'+filename,  function(err){
                    if(err){
                        console.log('erreur d\'envoie d\'image'+err)
                    } else{
                        console.log('file uploaded...')
                    }
                })
            }else{
                var filename = ''
            }
            const etudiantFound = await etudiantSchema.findById(idSender)
            if(!etudiantFound){
                console.log('etudiant not found')
            }
            
            const challengeFound = await challengeSchema.findById(idChallenge)
            const idClub = challengeFound.idClub
            const createNewPub = await pubSchema.create({
                idClub: idClub,
                sender: {
                    idSender: etudiantFound._id,
                    name: etudiantFound.pseudo,
                    niveau: etudiantFound.niveau,
                    image: etudiantFound.image
                },
                contenu: {
                    description: description,
                    files: filename
                },
                date: Date.now(),
                isChallenge: {
                    value: true,
                    idChallenge: challengeFound._id,
                    debut: debut,
                    fin: fin
                }
            })
            const newPub = await createNewPub.save()
            await challengeFound.updateOne({
                $push: {
                    listeChallenge: newPub._id
                }
            })
            const challenge = await challengeSchema.findById(idChallenge)
            const clubFound = await clubSchema.findById(idClub)
            const createNewNotification = await notificationSchema.create({
                sender: {
                    id: clubFound._id,
                    image: clubFound.logo,
                    name: clubFound.nom
                },
                idPub: newPub._id,
                texte: `Le club ${clubFound.nom} a une nouvelle publication`
            })
            for(let i=0; i<clubFound.membresEtudiant.length; i++){
                newNotification.receiver.push(clubFound.membresEtudiant[i])
            }
            const newNotification = await createNewNotification.save()
            return res.status(201).json({newPub, newNotification, challenge})
        } catch (e) {
            console.log(e);
            return res.status(500).json('erreur in catch')
        }
    },
    async getClubPublication (req, res){
        try {
            const idClub = req.params.id
            const allClubPub = await pubSchema.find({
                idClub: idClub,
                isChallenge: {
                    value: false
                }
            })
            if(!allClubPub){
                console.log('no one pub was publy')
                return res.status(404).json('erreur')
            }
            const challengeClub = await challengeSchema.find({idClub})
            for(let i=0; i<challengeClub.length; i++){
                allClubPub.push(challengeClub[i])
            }
            return res.status(200).json(allClubPub)
        } catch (e) {
            console.log(e);
            return res.status(500).json('erreur in catch')
        }
    },
    async takeChallenge (req, res){
        try {
            const idChallenge = req.body.idChallenge
            const idEtudiant = req.body.idEtudiant
            const etudiantFound = await etudiantSchema.findById(idEtudiant)
            const challengeFound = await challengeSchema.findById(idChallenge)
            const participantChallengeAdded = await challengeFound.updateOne({
                $push: {
                    participant: {
                        idParticipant: etudiantFound._id,
                        point: 0
                    }
                }
            })
            const participantAdded = await challengeSchema.findById(idChallenge)
            const updateEtudiant = await etudiantFound.listeChallenge.push(participantAdded._id)
            const listeChallengeAdded = await etudiantSchema.findById(idEtudiant)
            return res.status(200).json({participantAdded, listeChallengeAdded}) 
        } catch (e) {
            console.log(e);
            return res.status(500).json('erreur in catch')
        }
    },
    async commenterCours (req, res){
        try {
            const { idPub, idEtudiant, description } = req.body
            if(req.files){
                const image = req.files.file
                var filename = image.name
                image.mv('./src/uploads/'+filename,  function(err){
                    if(err){
                        console.log('erreur d\'envoie d\'image'+err)
                    } else{
                        console.log('file uploaded...')
                    }
                })
            }
            const pubFound  = await pubSchema.findById(idPub)
            const etudiantFound = await etudiantSchema.findById(idEtudiant)
            await pubFound.updateOne({
                $push: {
                    reponse: {
                         userSender: {
                            idSender: etudiantFound._id,
                            name: etudiantFound.pseudo,
                            niveau: etudiantFound.niveau,
                            image: etudiantFound.image
                         },
                         contenu: {
                            description: description,
                            file: filename
                         },
                         date: Date.now()
                    }
                }
            })
            const comsPub = await pubSchema.findById(idPub)
            return res.status(200).json(comsPub)
        } catch (e) {
            console.log(e);
            return res.status(500).json('erreur in catch')
        }
    },
    async repondreChallengeEdition (req, res){
        try {
            const { idPubChallenge, idEtudiant, description } = req.body
            if(req.files){
                const image = req.files.file
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
            const pubFound = await pubSchema.findById(idPubChallenge)
            const etudiantFound = await etudiantSchema.findById(idEtudiant)

            const challengeFound = await challengeSchema.findById(pubFound.isChallenge.idChallenge)
            if(!challengeFound){
                console.log('no challenge was found')
                return res.status(404)
            }
            await pubFound.updateOne({ 
                $push: {
                    reponse: {
                        userSender: {
                            idSender: etudiantFound._id,
                            name: etudiantFound.pseudo,
                            niveau: etudiantFound.niveau,
                            image: etudiantFound.image
                        },
                        contenu: {
                            description: description,
                            file: filename
                        },
                        date: Date.now(),
                        checkResponse: false
                    }
                }
            })
            const pubChallengeResponse = await pubSchema.findById(pubFound._id)
            return res.status(202).json(pubChallengeResponse)
        } catch (e) {
            console.log(e);
            return res.status(500).json('erreur in catch')
        }
    },
    async markTrueChallengeResponse (req, res){
        try {
            const { idPubChallenge, idEtudiant } = req.body
            const etudiantFound = await etudiantSchema.findById(idEtudiant)
            const challengeEditionFound = await pubSchema.findById(idPubChallenge)
            const idChallenge = challengeEditionFound.isChallenge.idChallenge
            const challengeFound = await challengeSchema.findById(idChallenge)
            const isParticipant = await challengeFound.participant.includes({idParticipant: etudiantFound._id})
            if(!isParticipant){
                console.log('you are not participant')
                return res.status(404)
            }
            challengeEditionFound.isChallenge.check = parseInt(challengeEditionFound.isChallenge.check) + 1
            const saveEdition = await challengeEditionFound.save()
            const nbParticipant = challengeFound.participant.length
            const nbCheck = challengeEditionFound.isChallenge.check
            const point = parseInt(nbParticipant) - parseInt(nbCheck)
            const addPoint = await challengeFound.updateOne({
                $set: {
                    participant: {
                        idParticipant: etudiantFound._id,
                        point: point
                    }
                }
            })
            return res.status(200).json({addPoint, saveEdition, })
        } catch (e) {
            console.log(e);
            return res.status(500).json('erreur in catch')
        }
    },
    async likePublication (req, res){
        try {
            const { idEtudiant } = req.body.idEtudiant
         const pubFound = await pubSchema.findById(req.params.id)
         if(!pubFound.likes.includes(idEtudiant)){
          await pubFound.updateOne({$push:{likes: req.body.userId}})
        } else{
          await pubFound.updateOne({$pull:{likes: req.body.userId}})
        }
        const savePub = await pubSchema.findById(challengeFound._id)
        return res.status(200).json(savePub)
        } catch (e) {
          res.status(500).json("Error, Please try egain");
        }
    }
}