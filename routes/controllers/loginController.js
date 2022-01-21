var express = require('express');
var router = express.Router();
var loginService = require("../services/loginService")



router.post("/", async function (req, res) {
    try {
    var loginData = req.body;
    var loginReps = await loginService.existedLogin(loginData)
    console.log("loginData",loginReps, loginData)
    res.json({loginReps, status: { code: "SUCCESS", message: "Login Created Successfully" } })    
    } catch (error) {
        res.json({ status: error })
        
    }
});


module.exports = router;
