const express = require('express')
const authController = require('../controllers/authController')
const signupEtudiant = require('../middlewares/signup')

const routerAuth = express.Router()

// signup etudiant
routerAuth.post('/signup', signupEtudiant.signupVerify, authController.signupEtudiant)

// login etudiant
routerAuth.post('/login', authController.loginEtudiant)

// log out etudiant
routerAuth.post('/logout', authController.logoutEtudiant)

module.exports = routerAuth