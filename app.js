require('dotenv').config();
const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const ejs = require('ejs');


//Internal imports
const mainRoute = require('./Server/Routes/main')
const adminRoute = require('./Server/Routes/admin')
const connectDB = require('./Server/Config/db');


const PORT = process.env.PORT || 5000 


//Connect Database
connectDB()

app.use(express.static('Public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//Templete Engine
app.use(expressLayout)
app.set('layout', './layouts/main.ejs')
app.set('view engine', 'ejs')


//Routes
app.use('/', mainRoute);
app.use('/', adminRoute);


//Error handle

function error(err,req,res,next){
    
}


app.listen(PORT, ()=>{
    console.log(`Listing on Port ${PORT}`)
})


