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
        console.log('check')
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



/**
 * GET /
 * Post :id
*/

router.get("/post/:id", async (req,res)=>{
    try {
        
        const slug = req.params.id;
        const data = await Post.findById({_id: slug})

        const locals = {
            title : data.title,
            description : "NodeJS blog site with mongoDb & Express"
        }

        res.render('post', { locals, data })
    } catch (error) {
        console.log(error);
        
    } 
})



/**
 * GET /
 * Post searchTerm
*/

router.post("/search", async (req,res)=>{
    try {
        const locals = {
            title : "Search",
            description : "NodeJS blog site with mongoDb & Express"
        }

        let searchTerm = req.body.searchTerm;
        
        const data = await Post.find() 
        
        res.render('search', { locals, data })
        
    } catch (error) {
        console.log(error);
        
    } 
})


/**
 * POST /
 * Admin Post
*/
// router.post("/admin", async (req,res)=>{
//     try {
//         const locals = {
//             title : "Search",
//             description : "NodeJS blog site with mongoDb & Express"
//         }

        
//         const data = await Post.find() 
        
//         res.render('search', { locals, data })
        
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
//         },
//         {
//             title : 'Learn JS',
//             body : 'Learn Javascript from LWS'
//         },
//         {
//             title : 'Bootstrap',
//             body : 'Bootstrap is a CSS framework'
//         },
//         {
//             title : 'Tailwind',
//             body : 'Tailwind is learn form LWS'
//         },

//         {
//             title : 'Next JS',
//             body : 'Next is a frame work of React'
//         },
//         {
//             title : 'React JS',
//             body : 'Learn React as a front end development'
//         },
//         {
//             title : 'Early Rise',
//             body : 'Above line is a Poem Title'
//         },

//         {
//             title : 'My Child',
//             body : 'Can not found any line to say'
//         },


//     ])
// }




// postData()


module.exports = router;