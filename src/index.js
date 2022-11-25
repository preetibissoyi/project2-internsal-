const express = require ('express')
const route = require('./route/route.js')
const mongoose = require('mongoose')
const app = express()


app.use(express.json())

 
mongoose.connect("mongodb+srv://chanda:QYho3EZNKLny4znA@cluster0.gkrjc46.mongodb.net/group25Database",{
   useNewUrlParser :true
})
.then(()=>console.log("mongoDb is connected"))
.catch((err)=>console.log(err))

app.use('/',route)
app.listen(3001 , function(){
    console.log("Server is running on PORT" + " " + 3001)
})
