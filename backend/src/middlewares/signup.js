const joi = require('joi')



module.exports = { 
    async signupVerify (req, res, next){
        try {
            const email = req.body.email
            const password = req.body.password
            const schemaSign = joi.object({
                email: joi.string().email(),
                password: joi.string().regex(new RegExp('^[a-zA-Z0-9]{6,32}$'))
            })
            const {error} = await schemaSign.validate({email, password})
    
            if(error){
                switch (error.details[0].context.key) {
                    case 'email':
                        res.status(401).send({
                            error: 'votre email est invalid'
                        })
                        break;
                    case 'password':
                        res.status(401).send({
                            error: 'mavais combinaison'
                        })
                        break;        
                               
                    default:
                        res.status(401).send('information invalid')
                        break;
                }
            } else{
                next()
            }
        } catch (e) {
            res.status(500).json(e)
        }
    }
 }