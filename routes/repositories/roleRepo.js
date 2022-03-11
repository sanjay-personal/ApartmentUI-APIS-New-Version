var database = require("../dbconnection/db")


var getApartmentByMobileNumber = function getApartmentByMobileNumber(mobileNumber) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("users_master").findOne({ "MobileNumber": mobileNumber }).then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}

var getRolesByApartmentIdWithRoleName = function getRolesByApartmentIdWithRoleName(ApartmentId,RoleName) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("role_master").findOne({ "ApartmentId": ApartmentId,"RoleName":RoleName}).then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}




var getRolesByApartmentId = function getRolesByApartmentId(ApartmentId) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("role_master").find({ "ApartmentId": ApartmentId}).toArray().then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}

var roleIdByStatusUpdateQuery= function roleIdByStatusUpdateQuery(apartmentId,RoleId, status) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("role_master").updateOne({"ApartmentId": apartmentId, "RoleId": RoleId }, { $set: { "Active": status } }).then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}

var getTotalRoles = function getTotalRoles() {
    return new Promise((resolve, reject) => {
        database.getDb().collection("role_master").find({}).toArray().then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}

var onFlatQuery = function onFlatQuery(FlatNumber,ApartmentId) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("flat_master").findOne({"ApartmentId":ApartmentId , "FlatNumber": FlatNumber }).then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}

var onFlatBlockQuery = function onFlatBlockQuery(BlockNumber,FlatNumber,ApartmentId) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("flat_master").findOne({"ApartmentId":ApartmentId ,"BlockNumber":BlockNumber,"FlatNumber": FlatNumber }).then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}

var insertRole = function insertRole(roleData) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("role_master").insertOne(roleData).then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}

var editRoleByApartmentIdRoleId = function editRoleByApartmentIdRoleId(apartmentId, roleId) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("role_master").findOne({ "ApartmentId":apartmentId,"RoleId": roleId }).then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}

var updateRole = function updateRole(apartmentId,roleId,flatData) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("role_master").updateOne({ "ApartmentId":apartmentId,"RoleId": roleId },{ $set: flatData }).then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}




module.exports = {
    getApartmentByMobileNumber: getApartmentByMobileNumber,
    getRolesByApartmentId:getRolesByApartmentId,
    getTotalRoles: getTotalRoles,
    onFlatQuery:onFlatQuery,
    insertRole:insertRole,
    onFlatBlockQuery:onFlatBlockQuery,
    roleIdByStatusUpdateQuery:roleIdByStatusUpdateQuery,
    editRoleByApartmentIdRoleId:editRoleByApartmentIdRoleId,
    updateRole :updateRole,
    getRolesByApartmentIdWithRoleName:getRolesByApartmentIdWithRoleName
}