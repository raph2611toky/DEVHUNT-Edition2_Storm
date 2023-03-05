const express = require('express')
const questionController = require('../controllers/questionController')
const routerQuestion = express.Router()

// create question
routerQuestion.post('/createQuestion', questionController.createNewQuestion)

// get all question
routerQuestion.get('/getAllQuestion', questionController.getAllQuestion)

// get my question
routerQuestion.get('/getMyQuestion/:id', questionController.getMyQuestion)

// reponse one quetion
routerQuestion.post('/reponseQuestion', questionController.responseOneQuestion)

// vue question
routerQuestion.patch('/vueQuestion/:id', questionController.vueOneQuestion)

// get one question
routerQuestion.get('/getOneQuestion/:id', questionController.getOneQuestion)

module.exports = routerQuestion