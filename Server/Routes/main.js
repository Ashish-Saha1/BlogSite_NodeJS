const express = require('express');
const router = express.Router();

router.get("/", (req,res)=>{
    res.send("Hellow Node Routes")
})


module.exports = router;