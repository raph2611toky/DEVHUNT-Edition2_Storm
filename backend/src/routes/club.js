const clubController = require('../controllers/clubController')
const express = require('express')
const routerClub = express.Router()

// create a new club
routerClub.post('/createNewClub', clubController.createClub)

// add new members
routerClub.post('/addMembers', clubController.addMembersStaff)

// update club
routerClub.patch('/updateClub/:id', clubController.updateClub)

// get all Club
routerClub.get('/getAllClub', clubController.getAllClub)

module.exports = routerClub