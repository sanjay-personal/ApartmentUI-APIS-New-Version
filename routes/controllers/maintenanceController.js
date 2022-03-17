
var express = require('express');
var router = express.Router();
var maintenanceService = require("../services/maintenanceService")

router.get("/", async function (req, res) {
    try {
        var getMaintenance = await maintenanceService.getMaintenance(req, res)
        res.json({ primary:getMaintenance, status: { code: "SUCCESS", message: "Retrived Successfully" } })
    } catch (error) {
        // console.log("getMaintenanceeerror", error)
        res.json({ status: error })
    }
});

router.post("/", async function (req, res) {
    try {
        var postMaintenance = await maintenanceService.postMaintenance(req, res)
        res.json({ status: postMaintenance})
    } catch (error) {
        // console.log("postMaintenanceerror", error)
        res.json({ status: error })
    }
});








module.exports = router;
