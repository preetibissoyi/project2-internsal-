const express = require ('express')
const route = require('../route/route.js')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

app.use(bodyParser)


mongoose.connect("mongodb+srv://<chanda>:<QYho3EZNKLny4znA>@cluster0.gkrjc46.mongodb.net/group25Database",{
   useNewUrlParser :true
})
.then(()=>console.log("mongoDb is connected"))
.catch((err)=>console.log(err))

app.listen(process.env.PORT || 3000 , function(){
    console.log("Server is running on PORT" + " " + (proces.env.PORT || 3000))
})

app.use("/",route)