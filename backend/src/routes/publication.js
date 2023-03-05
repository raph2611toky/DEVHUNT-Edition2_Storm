const publicationController = require('../controllers/publicationController')
const routerPub  = require('express').Router()

// create cours pub
routerPub.post('/createCoursPub', publicationController.createPublicationCours)

// create challenge pub
routerPub.post("/createNewChallenge" , publicationController.createNewChallenge)

// create pub challenge edition
routerPub.post('/createPubChallengeEdition', publicationController.createNewChallengeEdition)

// coms cours pub
routerPub.post('/commenterCoursPub', publicationController.commenterCours)


// get club pub
routerPub.get('/getClubPub/:id', publicationController.getClubPublication)

// take a challenge
routerPub.post('/takeChallenge', publicationController.takeChallenge)

// response challenge edition
routerPub.post('/responseChallengeEdition', publicationController.repondreChallengeEdition)

// mark as true challenge edition response 
routerPub.post('/markResponse', publicationController.markTrueChallengeResponse)

// like and dislike pub
routerPub.post('/likeDislikePub/:id', publicationController.likePublication)

module.exports = routerPub