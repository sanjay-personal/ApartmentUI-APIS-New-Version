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

router.post("/", async function (req, res) {
    try {
        var postFlats = await flatService.postFlats(req, res)
        console.log("postFlats", postFlats)
        res.json({ status: postFlats})
    } catch (error) {
        console.log("signupCreateerror", error)
        res.json({ status: error })
    }
});
router.post("/flatStatus", async function (req, res) {
    try {
        var flatStatus = await flatService.flatStatus(req, res)
        console.log("flatStatus", flatStatus)
        res.json({ status: flatStatus})
    } catch (error) {
        console.log("signupCreateerror", error)
        res.json({ status: error })
    }
});
module.exports = router;
