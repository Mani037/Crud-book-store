const express= require('express')
const {PORT,mongoDBURL} = require('./config')
const mongoose = require('mongoose')
const booksRoute = require('./routes/booksRoute')
const cors = require('cors')



const app = express()

//middleware
app.use(express.json())

//open cors
app.use(cors())

//custom cors
/*app.use(cors({
    origin: 'http://localhost:5000',
    methods:["GET", "POST", "PUT", "DELETE"],
    allowedHeaders:['Content-Type']
}))*/

//all routes
app.use('/books', booksRoute);

// db connect
mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("db is connected");
    app.listen(PORT, () =>{
        console.log(`Server is running in the Port: ${PORT}`)
    })
    
})
.catch(err=>{
    console.log(err)
})
