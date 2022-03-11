var roleRepo = require("../repositories/roleRepo")
var jwt = require('jsonwebtoken');
var dataEncoderDecoder = require('../customFunctions/dataEncodeDecode');
var usersRepo = require("../repositories/signupRepo")



var getRoles = async function getRoles(req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(ensureToken(req, res), 'my_sceret_key', async (err, loggedUser) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    let loginApartmentDetails = await roleRepo.getApartmentByMobileNumber(loggedUser['loginData']['MobileNumber'])
                    let roleList = await roleRepo.getRolesByApartmentId(loginApartmentDetails['ApartmentId'])
                    resolve(roleList)
                }
            });
        } catch (error) {
            reject(error)
        }
    })

}

var postRole = async function postRole(req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(ensureToken(req, res), 'my_sceret_key', async (err, loggedUser) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    var roleData = req.body;


                    var lastindex
                    var i = 0
                    var lastindexValue
                    var lastindex = await roleRepo.getTotalRoles()
                    if (lastindex.length === 0) {
                        roleData['RoleId'] = 'APSGMVDSR0';
                    } else {
                        lastindexValue = parseInt(lastindex[lastindex.length - 1]['RoleId'].replace("APSGMVDSR", ""));
                        i = ++lastindexValue;
                    }
                
                    let RoleId = 'APSGMVDSR' + i;
                    roleData['CreatedDate'] = new Date();
                    roleData['UpdatedDate'] = new Date();
                    roleData['RoleId'] = RoleId;
                
                    roleData['Active'] = "1";
                    let loginApartmentDetails = await roleRepo.getApartmentByMobileNumber(loggedUser['loginData']['MobileNumber'])
                    let role = await roleRepo.getRolesByApartmentIdWithRoleName(loginApartmentDetails['ApartmentId'],roleData['RoleName'])
                    roleData['ApartmentId'] = loginApartmentDetails['ApartmentId']
                    if (role === null) {
                        await roleRepo.insertRole(roleData)
                       resolve({ code: "SUCCESS", message: "New Role Created Successfully" })
                    } else {
                        return reject({ code: "ERROR", message: "Role is Already Existed" })
                    }
                }
            });
        } catch (error) {
            reject(error)
        }
    })

}


var roleStatus = async function roleStatus(req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(ensureToken(req, res), 'my_sceret_key', async (err, loggedUser) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    var body = req.body;
        var status
        var messageStatus
                    if (body['Active'] === "1") {
                        status = "0"
                        messageStatus = "Successfully InActivated the Role"
                    } else {
                        status = "1"
                        messageStatus = "Successfully Activated the Role"
                    }
                    await roleRepo.roleIdByStatusUpdateQuery(body["ApartmentId"],body['RoleId'] ,status)
                    resolve({ code: "SUCCESS", message: messageStatus })

                }
            });
        } catch (error) {
            reject(error)
        }
    })

}



var getRoleByApartmentIdRoleId = async function getRoleByApartmentIdRoleId(req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(ensureToken(req, res), 'my_sceret_key', async (err, loggedUser) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                   const roleId = req.params['roleId']
                   const apartmentId = req.params['apartmentId'] 
                   console.log("apartmentId, roleId",apartmentId, roleId)

                    if (roleId !== undefined && apartmentId !== undefined) {
                        console.log("apartmentId, roleId",apartmentId, roleId)
                        const role =  await roleRepo.editRoleByApartmentIdRoleId(apartmentId, roleId)
                       resolve(role)
                    } else {
                        return reject({ code: "ERROR", message: "RoleId or ApartmentId Missing" })
                    }
                }
            });
        } catch (error) {
            reject(error)
        }
    })

}


var updateRole = async function updateRole(req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(ensureToken(req, res), 'my_sceret_key', async (err, loggedUser) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    console.log("req.body",req.body)
                    let roleData =  req.body;
                    roleData['UpdatedDate'] = new Date();
                    roleData['Active'] = "1";
                    let roleId = req.body['RoleId'] ;
                    let apartmentId = req.body['ApartmentId'] ;

                    if (roleId !== undefined && apartmentId !== undefined) {
                        await roleRepo.updateRole(apartmentId, roleId, roleData)
                       resolve({ code: "SUCCESS", message: "Role Updated Sucessfully" })
                    } else {
                        return reject({ code: "ERROR", message: "RoleId or ApartmentId Missing" })
                    }
                }
            });
        } catch (error) {
            reject(error)
        }
    })

}

function ensureToken(req, res) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        return req.token
    } else {
        res.sendStatus(403)
    }
}

module.exports = {
    getRoles: getRoles,
    postRole:postRole,
    roleStatus:roleStatus,
    getRoleByApartmentIdRoleId:getRoleByApartmentIdRoleId,
    updateRole:updateRole
}