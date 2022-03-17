var express = require('express');
var router = express.Router();
var flatService = require("../services/flatService")

router.get("/", async function (req, res) {
    try {
        var getFlats = await flatService.getFlats(req, res)
        res.json({ primary:getFlats, status: { code: "SUCCESS", message: "Retrived Successfully" } })
    } catch (error) {
        res.json({ status: error })
    }
});

router.post("/", async function (req, res) {
    try {
        var postFlats = await flatService.postFlats(req, res)
        res.json({ status: postFlats})
    } catch (error) {
        res.json({ status: error })
    }
});

router.put("/", async function (req, res) {
    try {
        var updateFlat = await flatService.updateFlat(req, res)
        res.json({ status: updateFlat})
    } catch (error) {
        res.json({ status: error })
    }
});
router.post("/flatStatus", async function (req, res) {
    try {
        var flatStatus = await flatService.flatStatus(req, res)
        // console.log("flatStatus", flatStatus)
        res.json({ status: flatStatus})
    } catch (error) {
        // console.log("signupCreateerror", error)
        res.json({ status: error })
    }
});

router.get("/:apartmentId/:flatId", async function (req, res) {
    try {
        var getFlatByApartmentIdFlatId = await flatService.getFlatByApartmentIdFlatId(req, res)
        // console.log("getFlatByApartmentIdFlatId", getFlatByApartmentIdFlatId)
        res.json({ primary:getFlatByApartmentIdFlatId, status: { code: "SUCCESS", message: "Retrived Successfully" } })
    } catch (error) {
        // console.log("signupCreateerror", error)
        res.json({ status: error })
    }
});
module.exports = router;
