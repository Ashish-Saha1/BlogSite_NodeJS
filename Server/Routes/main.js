const express = require('express');
const router = express.Router();
const Post = require('../../Server/Models/Post');


router.get("/", async (req,res)=>{
    try {
        const locals = {
            title : "Index Page",
            description : "NodeJS blog site with mongoDb & Express"
        }

        const data = await Post.find()

        res.render('index', { locals, data })
    } catch (error) {
        console.log(error);
        
    }
})



router.get("/about", (req,res)=>{
    const locals = {
        title : "About Page",
        description : "NodeJS blog site with mongoDb & Express"
    }
    res.render('about', { locals })
})



// function postData(){
//     Post.insertMany([
//         {
//             title : 'Building API with Node JS',
//             body : 'Learn how to learn Node Js'
//         },
//         {
//             title : 'Deployment Node JS',
//             body : 'Understand the different way of Node js'
//         },
//         {
//             title : 'Authentication & Authoraization in Node JS',
//             body : 'How to work Node JS & Mongo DB'
//         },
//         {
//             title : 'Express JS',
//             body : 'Learn Express JS from LWS'
//         }
//     ])
// }

// postData()


module.exports = router;