const express = require('express');
const router = express.Router();

router.get("/", (req,res)=>{
    const locals = {
        title : "Index Page",
        description : "NodeJS blog site with mongoDb & Express"
    }
    res.render('index', { locals })
})

router.get("/about", (req,res)=>{
    const locals = {
        title : "About Page",
        description : "NodeJS blog site with mongoDb & Express"
    }
    res.render('about', { locals })
})


module.exports = router;