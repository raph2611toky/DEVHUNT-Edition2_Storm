const express = require('express')
const upload = require('express-fileupload')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const cors = require("cors")
require('dotenv').config()
const morgan = require("morgan")
const port = process.env.PORT || 4000
const app = new express()     

// middleware
app
   .use(cors({ origin: "http://localhost:3000"}))
   .use(express.urlencoded({ extended: true }))
   .use(bodyParser.urlencoded({ extended: true }))
   .use(express.json())
   .use(express.static('uploads'))
   .use("/images", express.static("./src/uploads"))
   .use(morgan('dev'))
   .use(upload())

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
 });
   
// route
app.use('/api', require('./src/routes/auth'))
app.use('/api', require('./src/routes/question'))
app.use('/api', require('./src/routes/etudiant'))
app.use('/api', require('./src/routes/listeEtudiant'))
app.use('/api', require('./src/routes/club'))
app.use('/api', require('./src/routes/notification'))
app.use('/api', require('./src/routes/publication'))
app.use('/api', require('./src/routes/challenge'))

// connexion to the database
mongoose.set('strictQuery' , true)
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true , useUnifiedTopology:true})       
const db = mongoose.connection
db.on("error" , (error) => console.log(error))
db.once("open" ,()=> console.log('Database conected....'))     

app.listen(port , ()=> console.log('server start on port ' + port))         

  