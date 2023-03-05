const express = require('express')
const etudiantController = require('../controllers/etudiantController')
const routerEtudiant = express.Router()

// update etudiant
routerEtudiant.patch('/updateEtudiant/:id', etudiantController.updateEtudiant)

// get one Etudiant
routerEtudiant.get('/getOneEtudiant/:id', etudiantController.getOneEtudiant)

// get All etudiant
routerEtudiant.get('/getAllEtudiant', etudiantController.getAllEtudiant)

//delete Etudiant
routerEtudiant.delete('/deleteEtudiant/:id' , etudiantController.deleteEtudiant)

module.exports = routerEtudiant