const router = require("express").Router()
const notificationController = require("../controllers/notificationController")

//get All notification
router.get("/getAllNotification" , notificationController.getAllNotification)

//get My notification
router.get("/getAllNotification" , notificationController.getMyNotification)

module.exports = router