const etudiantSchema = require('../models/etudiant')
const listeEtudiantSchema = require('../models/listeEtudiants')



module.exports = {
    async signupEtudiant (req, res){
        try {
            const { nomComplet, pseudo, matricule, email, password, niveau } = req.body
            const adminExist = await etudiantSchema.findOne({isAdmin: true})
            console.log(adminExist)
            if(!adminExist){
                var admin = true
                const addAdminInListe = await listeEtudiantSchema.create({
                    nomComplet: nomComplet,
                    matricule: matricule
                })
                const saveAdmin = await addAdminInListe.save()
            } else{
                var admin = false
                const isMatriculeValid = await listeEtudiantSchema.findOne({ matricule: matricule})
                if(!isMatriculeValid){
                    console.log('matricule not found')
                    return res.status(404)
                }
                if(isMatriculeValid.nomComplet !== nomComplet){
                    console.log('etudiant not valid')
                    return res.status(404)
                }
            }
            console.log(admin);
            
            const createNewEtudiant = await etudiantSchema.create({
                nomComplet: nomComplet,
                pseudo: pseudo,
                matricule: matricule,
                email: email,
                password: password,
                niveau: niveau,
                isAdmin: admin
            })
            const newEtudiant = await createNewEtudiant.save()
            let authToken = newEtudiant.generateTokenAndSaveUser()
            console.log(authToken);
            console.log(newEtudiant.tokens);
            const nb = parseInt(newEtudiant.tokens.length) - 1
            authToken = newEtudiant.tokens[nb].authToken
            return res.status(201).json({newEtudiant, authToken})
        } catch (e) {
            console.log(e)
            return res.status(500).json('erreur')
        }
    },
    async loginEtudiant (req, res){
        try {
            const {email, password} = req.body
            const etudiantFound = await etudiantSchema.findOne({email: email})
            if(!etudiantFound){
                console.log('etudiant not found')
                return res.status(404).json('etudiant not found')
            }
            const isPasswordValid = await etudiantFound.verifyPassword(password)
            if(!isPasswordValid){
                console.log('password not valid')
                return res.status(404).json('information not valid')
            }
            let authToken = etudiantFound.generateTokenAndSaveUser()
            console.log(`authtoken:   ${authToken}`)
            authToken = etudiantFound.tokens[etudiantFound.tokens.length - 1].authToken
            return res.status(200).json({etudiantFound, authToken})
        } catch (e) {
                console.log(e);
                return res.status(500).json('erreur')
        }
    },
    async logoutEtudiant (req, res){
        try {
            const authToken = req.body.authToken
            const idEtudiant = req.body.idEtudiant
            const etudiantFound = await etudiantSchema.findById(idEtudiant)
            if(!etudiantFound){
                console.log('etudiant not found')
            }
            etudiantFound.tokens = await etudiantFound.tokens.filter( auth => {
                return auth.authToken !== authToken
            })
            await etudiantFound.save()
            console.log('deconnexion...');
            return res.status(200).json({etudiantFound, authToken})
        } catch (e) {
            console.log(e);
            return res.status(500).json('erreur')
        }
    }
}