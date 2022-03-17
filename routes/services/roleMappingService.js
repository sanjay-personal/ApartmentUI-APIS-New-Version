var roleMappingRepo = require("../repositories/roleMappingRepo")
var jwt = require('jsonwebtoken');



var getRolesMapping = async function getRolesMapping(req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(ensureToken(req, res), 'my_sceret_key', async (err, loggedUser) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    let loginApartmentDetails = await roleMappingRepo.getApartmentByMobileNumber(loggedUser['loginData']['MobileNumber'])
                    let roleList = await roleMappingRepo.getRolesMappingByApartmentId(loginApartmentDetails['ApartmentId'])
                    resolve(roleList)
                }
            });
        } catch (error) {
            reject(error)
        }
    })

}

var postRoleMapping = async function postRoleMapping(req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(ensureToken(req, res), 'my_sceret_key', async (err, loggedUser) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    var roleMappingData = req.body;


                    var lastindex
                    var i = 0
                    var lastindexValue
                    var lastindex = await roleMappingRepo.getTotalRolesMapping()
                    if (lastindex.length === 0) {
                        roleMappingData['RoleMappingId'] = 'APSGMVDSRM0';
                    } else {
                        lastindexValue = parseInt(lastindex[lastindex.length - 1]['RoleMappingId'].replace("APSGMVDSRM", ""));
                        i = ++lastindexValue;
                    }
                
                    let RoleMappingId = 'APSGMVDSRM' + i;
                    roleMappingData['CreatedDate'] = new Date();
                    roleMappingData['UpdatedDate'] = new Date();
                    roleMappingData['RoleMappingId'] = RoleMappingId;
                
                    roleMappingData['Active'] = "1";
                    // let loginApartmentDetails = await roleMappingRepo.getApartmentByMobileNumber(loggedUser['loginData']['MobileNumber'])
                    let role = await roleMappingRepo.getExisted("role_mapping_master",roleMappingData['ApartmentId'],roleMappingData['MobileNumber'])

                    if (role === null) {
                        await roleMappingRepo.insertRoleMapping(roleMappingData)
                        await roleMappingRepo.updateUsersRole(roleMappingData['ApartmentId'], roleMappingData['MobileNumber'], { "ApartmentId":roleMappingData['ApartmentId'],"MobileNumber": roleMappingData['MobileNumber'],"Roles":roleMappingData['Roles'], "UpdatedDate":roleMappingData['UpdatedDate'] })
                       resolve({ code: "SUCCESS", message: "Role is Assigned Successfully" })
                    } else {
                        return reject({ code: "ERROR", message: "Role Assigned is Already Existed" })
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
                    await roleMappingRepo.roleIdByStatusUpdateQuery(body["ApartmentId"],body['RoleId'] ,status)
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
                //    console.log("apartmentId, roleId",apartmentId, roleId)

                    if (roleId !== undefined && apartmentId !== undefined) {
                        // console.log("apartmentId, roleId",apartmentId, roleId)
                        const role =  await roleMappingRepo.editRoleByApartmentIdRoleId(apartmentId, roleId)
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
                    // console.log("req.body",req.body)
                    let roleMappingData =  req.body;
                    roleMappingData['UpdatedDate'] = new Date();
                    roleMappingData['Active'] = "1";
                    let roleId = req.body['RoleId'] ;
                    let apartmentId = req.body['ApartmentId'] ;

                    if (roleId !== undefined && apartmentId !== undefined) {
                        await roleMappingRepo.updateRole(apartmentId, roleId, roleMappingData)
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
    getRolesMapping: getRolesMapping,
    postRoleMapping:postRoleMapping,
    roleStatus:roleStatus,
    getRoleByApartmentIdRoleId:getRoleByApartmentIdRoleId,
    updateRole:updateRole
}