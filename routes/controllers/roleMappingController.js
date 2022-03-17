var express = require('express');
var router = express.Router();
var roleService = require("../services/roleMappingService")

router.get("/", async function (req, res) {
    try {
        var getRolesMapping = await roleService.getRolesMapping(req, res)
        res.json({ primary:getRolesMapping, status: { code: "SUCCESS", message: "Retrived Successfully" } })
    } catch (error) {
        // console.log("signupCreateerror", error)
        res.json({ status: error })
    }
});

router.post("/", async function (req, res) {
    try {
        var postRoleMapping = await roleService.postRoleMapping(req, res)
        res.json({ status: postRoleMapping})
    } catch (error) {
        // console.log("signupCreateerror", error)
        res.json({ status: error })
    }
});

router.put("/", async function (req, res) {
    try {
        var updateRole = await roleService.updateRole(req, res)
        res.json({ status: updateRole})
    } catch (error) {
        // console.log("signupCreateerror", error)
        res.json({ status: error })
    }
});
router.post("/roleStatus", async function (req, res) {
    try {
        var roleStatus = await roleService.roleStatus(req, res)
        res.json({ status: roleStatus})
    } catch (error) {
        // console.log("signupCreateerror", error)
        res.json({ status: error })
    }
});

router.get("/:apartmentId/:roleId", async function (req, res) {
    try {
        var getRoleByApartmentIdRoleId = await roleService.getRoleByApartmentIdRoleId(req, res)
        // console.log("getRoleByApartmentIdRoleId", getRoleByApartmentIdRoleId)
        res.json({ primary:getRoleByApartmentIdRoleId, status: { code: "SUCCESS", message: "Retrived Successfully" } })
    } catch (error) {
        // console.log("signupCreateerror", error)
        res.json({ status: error })
    }
});
module.exports = router;
