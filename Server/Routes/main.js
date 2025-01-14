const express = require('express');
const router = express.Router();
const Post = require('../../Server/Models/Post');

/**
 * GET /
 * HOME
*/

router.get("/", async (req,res)=>{
    try {
        const locals = {
            title : "Index Page",
            description : "NodeJS blog site with mongoDb & Express"
        }

        const perPage = 5;
        const page = req.query.page || 1;

        const data = await Post.aggregate([ { $sort: {createdAt: -1} } ])
                    .skip(perPage * page - perPage)
                    .limit(perPage)
                    .exec();
        
        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
        

        res.render('index', {
            locals, 
            data,
            current : page,
            nextPage : hasNextPage ? nextPage : null

            })

    } catch (error) {
        console.log(error);
        
    } 
})





// router.get("/", async (req,res)=>{
//     const locals = {
//         title : "Index Page",
//         description : "NodeJS blog site with mongoDb & Express"
//     }

//     try {
//         const data = await Post.find()
//         res.render('index', { locals, data })
//     } catch (error) {
//         console.log(error);
        
//     } 
// })



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

// async function postData(){
//   await  Post.insertMany([
//         {
//             title : 'Mern Stack from Office',
//             body : 'Learn how to use Mern'
//         }
     
//     ])
// }

//  postData()


module.exports = router;