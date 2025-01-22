const express = require('express');
const router = express.Router();
const Post = require('../../Server/Models/Post');
const User = require('../../Server/Models/User');
const bcrypt = require('bcrypt');


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
        const {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        User.
            
    
    
    res.render('admin/index', {locals, layout : adminLayout})
    } catch (error) {
        console.log(error);
        
    } 
})

router.post("/register", async (req,res)=>{
    
    try {
        const {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

       const userData = await User.insertMany([{
            username,
            password : hashedPassword
        }])
            
    
 
    
    res.status(200).json({"Data": userData })
    } catch (error) {
        console.log(error);
        
    } 
})





module.exports = router;