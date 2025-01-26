require('dotenv').config();
const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const ejs = require('ejs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

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

app.use(cookieParser());
app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : true,
    store : MongoStore.create({
        mongoUrl : process.env.MONGODB_URI
    }),

    //cookie : {maxAge: new Date( Date.now() + (3600000))}
    //Date.now() - 30 * 24 * 60 * 60 * 1000;

}));

//Routes
app.use('/', mainRoute);
app.use('/', adminRoute);



//Not found Error handle

app.use((req,res,next)=>{
    console.log('Url not found');
    
    res.status(404).send(`Requested URL not found`)
})

//Error handle
app.use((err,req,res,next)=>{
    if(err.message){
        res.status(500).send(err.message)
    }else{
        res.send({ErrorFound: err })
    }
})


app.listen(PORT, ()=>{
    console.log(`Listing on Port ${PORT}`)
})


