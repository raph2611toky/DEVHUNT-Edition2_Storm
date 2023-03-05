const questionSchema = require('../models/question')
const etudiantSchema = require('../models/etudiant')
const notificationSchema = require('../models/notification')

module.exports = {
    async createNewQuestion (req, res){
        try {
            const { title, idEtudiant, description } = req.body
            console.log(req); 
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
            }else{
                var filename = ''
            }
            const etudiantFound = await etudiantSchema.findById(idEtudiant)
            if(!etudiantFound){
                console.log('etudiant not found')
                return res.status(404)
            }
            const createNewQuestion = await questionSchema.create({
                title: title,
                user: {
                    idUser: etudiantFound._id,
                    pseudo: etudiantFound.pseudo,
                    image: etudiantFound.image,
                    niveau: etudiantFound.niveau
                },
                contenu: {
                    description: description,
                    fichiers: filename
                },
                vue: 0,
                date: Date.now().toLocaleString
            })
            const newQuestion = await createNewQuestion.save()
            console.log('new question was create')
            return res.status(200).json(newQuestion)
        } catch (e) {
            console.log(e)
            return res.status(500).json('erreur')
        }
    },
    async getAllQuestion (req, res){
        try {
            const allQuestions = await questionSchema.find()
            if(!allQuestions){
                console.log('no question was found')
            }
            return res.status(200).json(allQuestions)
        } catch (e) {
            console.log(e)
            return res.status(500).json('erreur')
        }
    },
    async getMyQuestion (req, res){
        try {
            const idEtudiant = req.params.id
            const etudiantFound = await etudiantSchema.findById(idEtudiant)
            const myQuestion = await questionSchema.find({
                user: {
                    idUser: etudiantFound._id,
                    pseudo: etudiantFound.pseudo,
                    image: etudiantFound.image,
                    niveau: etudiantFound.niveau
                }
            })
            console.log(myQuestion);
            if(!myQuestion){
                res.status(404)
                console.log('no question was found');
            }
            return res.status(200).json(myQuestion)
        } catch (e) {
            
        }
    },
    async responseOneQuestion (req, res){
        try {
            const { idQuestion, idResponse, description } = req.body
            console.log(req.body);
            console.log(`id Question : ${idQuestion}, id reponse : ${idResponse}`);
            const questionFound = await questionSchema.findById(idQuestion)
            const etudiantFound = await etudiantSchema.findById(idResponse)
            if(req.files){
                console.log(req.files)
                if(req.files.length === undefined){
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
                    var filename = []
                    console.log(req.files);
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
                }
            }else{
                var filename = ''
            }
            const responseQuestion = await questionFound.updateOne({
                $push: {
                    reponse: {
                        userSender: {
                            idSender: idResponse,
                            pseudo: etudiantFound.pseudo,
                            image: etudiantFound.image,
                            niveau: etudiantFound.niveau
                        },
                        description: description,
                        fichiers: filename,
                        date: Date.now()
                    }
                }
            })
            console.log(`response : ${responseQuestion}`);
            const searchQuestion = await questionSchema.findById(idQuestion)
            const createNewNotification = await notificationSchema.create({
                receiver: questionFound.user.idUser,
                sender: {
                    id: etudiantFound._id,
                    image: etudiantFound.image,
                    name: etudiantFound.pseudo,
                    niveau: etudiantFound.niveau
                }
            })
            const saveNotification = await createNewNotification.save()
            return res.status(200).json({searchQuestion, saveNotification})
        } catch (e) {
            console.log(e);
            res.status(500)
        }
    },
    async vueOneQuestion (req, res){
        console.log('in vue question');
        try {
            const idQuestion = req.params.id
            const questionFound = await questionSchema.findById(idQuestion)
            if(!questionFound){
                console.log('question not found');
                return res.status(404)
            }
            questionFound.vue = parseInt(questionFound.vue) + 1
            const saveQuestion = await questionFound.save()
            return res.status(200).json(saveQuestion)
        } catch (e) {
            console.log(e);
            res.status(500)
        }
    },
    async getOneQuestion (req, res){
        try {
            const idQuestion = req.params.id
            const questionFound = await questionSchema.findById(idQuestion)
            if(!questionFound){
                console.log('no question was found')
                return res.status(404).json('no question')
            }
            return res.status(200).json(questionFound)
        } catch (e) {
            console.log(e);
            res.status(500)
        }
    }
}