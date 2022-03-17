var express = require('express');
var router = express.Router();
var signupService = require("../services/signupService")

router.post("/", async function (req, res) {
    try {
        var signupCreate = await signupService.singupCreate(req, res)
        // console.log("signupCreate", signupCreate)
        res.json({ status: { code: "SUCCESS", message: "Signup Created Successfully" } })
    } catch (error) {
        // console.log("signupCreateerror", error)

        res.json({ status: error })
    }
});

module.exports = router;
