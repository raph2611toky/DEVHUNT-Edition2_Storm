const notificationSchema = require("../models/notification")
const etudiantSchema = require("../models/etudiant")

module.exports = {
    async getAllNotification  (req , res){
        try {
            const allNotification = await notificationSchema.find()
            if(!allNotification){
             return   res.status(403).json(" No user Found")
            }
            return res.status(200).json(allNotification)
        } catch (error) {
            console.log(error)
            return res.status(500).json("Failed to find user , Try egain!")
        }
      
    },
    async getMyNotification  (req ,res){
        try {
            const idetudiant = req.params.id
            const etudiantFound = await etudiantSchema.findById(idetudiant)
            const notificationFound = await notificationSchema.find( { sender: {  id: etudiantFound._id}} )
            if(!notificationFound)
            {
                return res.status(403).json("No notification Found")
            }
            return res.status(200).json(notificationFound) 
        } 
         catch (error) {
            console.log(error);
            return res.status(500).json("Failed , please Try egain") 
        }
     
  }    
}