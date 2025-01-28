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
        console.log(req.cookies.token);
        
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
 * Admin Check Login
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
        console.log(req.cookies);
                
        res.redirect('/dashboard')
        //res.status(200).json({Mess: "Successfully Signin", token})    
    
    
    //res.render('admin/index', { layout : adminLayout})
    } catch (error) {
        console.log(error);
        
    } 
})





router.get('/dashboard', authMiddleware, (req,res,next)=>{
    try {
        res.render('admin/dashboard')
    } catch (error) {
        console.log({"Dashboard Route": error});
        console.log(req.userId);
        
    }
})



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





module.exports = router;