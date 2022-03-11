var express = require('express');
var router = express.Router();
var roleService = require("../services/roleService")

router.get("/", async function (req, res) {
    try {
        var getRoles = await roleService.getRoles(req, res)
        console.log("getRoles", getRoles)
        res.json({ primary:getRoles, status: { code: "SUCCESS", message: "Retrived Successfully" } })
    } catch (error) {
        console.log("signupCreateerror", error)
        res.json({ status: error })
    }
});

router.post("/", async function (req, res) {
    try {
        var postRole = await roleService.postRole(req, res)
        console.log("postRole", postRole)
        res.json({ status: postRole})
    } catch (error) {
        console.log("signupCreateerror", error)
        res.json({ status: error })
    }
});

router.put("/", async function (req, res) {
    try {
        var updateRole = await roleService.updateRole(req, res)
        console.log("postRole", updateRole)
        res.json({ status: updateRole})
    } catch (error) {
        console.log("signupCreateerror", error)
        res.json({ status: error })
    }
});
router.post("/roleStatus", async function (req, res) {
    try {
        var roleStatus = await roleService.roleStatus(req, res)
        console.log("roleStatus", roleStatus)
        res.json({ status: roleStatus})
    } catch (error) {
        console.log("signupCreateerror", error)
        res.json({ status: error })
    }
});

router.get("/:apartmentId/:roleId", async function (req, res) {
    try {
        var getRoleByApartmentIdRoleId = await roleService.getRoleByApartmentIdRoleId(req, res)
        console.log("getRoleByApartmentIdRoleId", getRoleByApartmentIdRoleId)
        res.json({ primary:getRoleByApartmentIdRoleId, status: { code: "SUCCESS", message: "Retrived Successfully" } })
    } catch (error) {
        console.log("signupCreateerror", error)
        res.json({ status: error })
    }
});
module.exports = router;
