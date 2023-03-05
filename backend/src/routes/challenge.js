const routeChallenge = require("express").Router()
const controllerChallenge = require("../controllers/challengeController")

//getallcub challenge
routeChallenge.get("/getClubChallenge" , controllerChallenge.getClubChallenge)

//getOne challenge
routeChallenge.get("/getOnechallenge" , controllerChallenge.getOnechallenge)

// like or dislike challenge
routeChallenge.post('/likeDislike/:id', controllerChallenge.likePublication)

module.exports = routeChallenge