const express = require('express');
const router = express.Router();
const Post = require('../../Server/Models/Post');
const User = require('../../Server/Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = "../views/Layouts/admin.ejs"

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
            res.status(409).json({Mess: "User Not found"})
        }

        const password = await bcrypt.compare(req.body.password, user.password);

        if(!password){
        res.status(409).json({Mess: "User Not found"})
        }

        const token = jwt.sign({username: user.username,
                                userId: user._id  }, 
                                process.env.JWT_SECRET,
                                { expiresIn: 60 * 60 }
                            );
        res.status(200).json({Mess: "Successfully Signin", token})    
    
    
    //res.render('admin/index', { layout : adminLayout})
    } catch (error) {
        console.log(error);
        
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