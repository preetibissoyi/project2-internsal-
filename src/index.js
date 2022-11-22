const express = require ('express')
const route = require('./route/route.js')
const mongoose = require('mongoose')
const app = express()

const AppError = require("../src/Utils/appError"); // JIVAN
const { globalErrorHandler } = require("./controller/errorController"); // JIVAN


app.use(express.json())

//   .connect("mongodb://0.0.0.0:27017/group25Database", {
mongoose.connect("mongodb+srv://chanda:QYho3EZNKLny4znA@cluster0.gkrjc46.mongodb.net/group25Database",{
   useNewUrlParser :true
})
.then(()=>console.log("mongoDb is connected"))
.catch((err)=>console.log(err))

app.use("/", route)

// JIVAN
app.all("*", (req, res, next) => {
  next(new AppError(`can not find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
// JIVAN


app.listen(3000 , function(){
    console.log("Server is running on PORT" + " " + 3000)
})
