const express = require('express');
const router = express.Router();
const Post = require('../../Server/Models/Post');
const User = require('../../Server/Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = "../views/Layouts/admin.ejs"


//MIddleware for check login
const authMiddleware = async function(req,res,next){
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({Message: "Unauthorized, token not found"})
        }

        const decode = await jwt.verify(token, process.env.JWT_SECRET)
                        req.userId = decode.userId;
                        next()
    } catch (error) {
        res.status(404).json({"Mess": "Check login authetication problem"})
        console.log({"CheckLogin":error.message});
        
    }
}

/**
 * GET /
 * Admin Login Page
*/
router.get("/admin", async (req,res)=>{
    
    try {
        const locals = {
            title : "Admin",
            description : "NodeJS blog site with mongoDb & Express"
        }
        
        res.render('admin/index', {locals, layout : adminLayout})
    } catch (error) {
        console.log(error);
        
    } 
})



/**
 * POST /
 * Admin Login
*/
router.post("/admin", async (req,res)=>{
    
    try {
        const user = await User.findOne({username: req.body.username});
        if(!user){
            res.status(401).json({Mess: "User Not found"})
        }
        const password = await bcrypt.compare(req.body.password, user.password);
        if(!password){
        res.status(401).json({Mess: "User Not found"})
        }
        const token = jwt.sign({username: user.username,
                                userId: user._id  }, 
                                process.env.JWT_SECRET,
                                { expiresIn: 60 * 60 }
                            );
        res.cookie('token', token, {httpOnly: true})
        
                
        res.redirect('/dashboard')
        //res.status(200).json({Mess: "Successfully Signin", token})    
    
    
    //res.render('admin/index', { layout : adminLayout})
    } catch (error) {
        console.log(error);
        
    } 
})



/**
 * POST /
 * Admin Dashboard
*/

router.get('/dashboard', authMiddleware, async (req,res,next)=>{
    const locals = {
        title : "Dashboard",
        description : "NodeJS blog site with mongoDb & Express"
    }

    try {
        const data = await Post.find({})
        
        res.render('admin/dashboard', {locals, data, layout:adminLayout})
    } catch (error) {
        console.log({"Dashboard Route": error});
        console.log(req.userId);
        
    }
})


/**
 * POST /
 * Admin Register
*/
router.post("/register", async (req,res)=>{
    
    try {
        const {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const userData = await User.create({
                username,
                password : hashedPassword
            })
           
        res.status(200).json({"Data": userData })
        } catch (error) {
            if(error.code === 11000){
                console.log('ErrorKey Duplicate input');
                res.render('admin/index')
            }else{
                throw error
            }
        }
      
    } catch (error) {
        console.log(error);
        
    } 
})




/**
 * POST Get method
 * Admin Create New Post (Add Post)
*/

router.get('/add-post', authMiddleware, async (req,res,next)=>{
    const locals = {
        title : "Add New Post",
        description : "NodeJS blog site with mongoDb & Express"
    }

    try {
        const data = await Post.find({})
        
        res.render('admin/add-post', {locals, data, layout:adminLayout})
    } catch (error) {
        console.log({"Dashboard Route": error});
        console.log(req.userId);
        
    }
})



/**
 * POST /
 * Admin Submit post (Means add new post submit)
*/

router.post('/add-post', authMiddleware, async (req,res,next)=>{
    
    try {
        const post = new Post({
            title : req.body.title,
            body : req.body.body,
        });
            await Post.create(post)
            res.redirect('dashboard')

    } catch (error) {
        res.status(500).json({Mess: `Add post submit: error`})
        console.log({"Add post submit": error});        
    }
})


// **
//  * POST /
//  * Admin Edit post 
// */

router.get('/edit-post/:id', authMiddleware, async (req,res,next)=>{
        
    try {
        const locals = {
            title : "Add New Post",
            description : "NodeJS blog site with mongoDb & Express"
        }
        const data = await Post.findOne({_id: req.params.id}); 
        res.render('admin/edit-post', {data, locals, layout : adminLayout})
        
    } catch (error) {
        res.status(500).json({Mess: `Edit post: ${error.message}`})
        console.log({"Add post submit": error});        
    }
})

// **
//  * PUT / Update
//  * Admin Edit post 
// */
router.put('/edit-post/:id', authMiddleware, async (req,res,next)=>{
    
try {
    await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body,
        updatedAt : Date.now()
    }); 
    //res.redirect(`/edit-post/${req.params.id}`)
    res.redirect('/dashboard')
    
    
} catch (error) {
    res.status(500).json({Mess: `Edit post: ${error.message}`})
    console.log({"Add post submit": error});        
}
})


// **
//  * Delete Post
//  * Admin Delete post 
// */
router.delete('/delete-post/:id', authMiddleware, async (req,res,next)=>{

    try {
        
        const deletePost = await Post.deleteOne({_id : req.params.id})
        res.redirect('/dashboard')
        

    } catch (error) {
        res.status(500).json({Mess: `Delete post: ${error.message}`})
        console.log({"Delete submit": error});
    }


})


// **
//  * Log Out
//  * Admin Log-Out 
// */
router.get('/logout', authMiddleware, async (req,res,next)=>{

    try {
        
        res.clearCookie('token')
        res.redirect('/')
        

    } catch (error) {
        res.status(500).json({Mess: `Logout: ${error.message}`})
        console.log({"Logout submit": error});
    }


})


module.exports = router;