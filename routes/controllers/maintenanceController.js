
var express = require('express');
var router = express.Router();
var maintenanceService = require("../services/maintenanceService")

// router.get("/", async function (req, res) {
//     try {
//         var getFlats = await flatService.getFlats(req, res)
//         console.log("getFlats", getFlats)
//         res.json({ primary:getFlats, status: { code: "SUCCESS", message: "Retrived Successfully" } })
//     } catch (error) {
//         console.log("signupCreateerror", error)
//         res.json({ status: error })
//     }
// });

router.post("/", async function (req, res) {
    try {
        var postMaintenance = await maintenanceService.postMaintenance(req, res)
        console.log("postMaintenance", postMaintenance)
        res.json({ status: postMaintenance})
    } catch (error) {
        console.log("postMaintenanceerror", error)
        res.json({ status: error })
    }
});








module.exports = router;
