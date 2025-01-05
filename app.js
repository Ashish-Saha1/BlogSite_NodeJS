require('dotenv').config();
const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const ejs = require('ejs');


//Internal imports
const mainRoute = require('./Server/Routes/main')


const PORT = process.env.PORT || 5000 


app.use(express.static('Public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Templete Engine
app.use(expressLayout)
app.set('view engine', 'ejs')
app.set('layouts', './layouts/main')


//Routes
app.use('/', mainRoute)

app.listen(PORT, ()=>{
    console.log(`Listing on Port ${PORT}`)
})


