var express = require('express');
var router = express.Router();
var flatService = require("../services/flatService")

router.get("/", async function (req, res) {
    try {
        var getFlats = await flatService.getFlats(req, res)
        console.log("getFlats", getFlats)
        res.json({ primary:getFlats, status: { code: "SUCCESS", message: "Retrived Successfully" } })
    } catch (error) {
        console.log("signupCreateerror", error)
        res.json({ status: error })
    }
});

module.exports = router;
