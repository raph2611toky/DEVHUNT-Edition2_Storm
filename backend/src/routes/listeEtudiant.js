const express = require("express")
const routerListe = express.Router()
const listController = require("../controllers/listController")

routerListe.post("/listEtudiant" , listController.createList)

module.exports = routerListe