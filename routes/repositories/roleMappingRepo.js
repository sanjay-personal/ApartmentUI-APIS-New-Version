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

var getExisted = function getExisted(collectionName,ApartmentId,MobileNumber) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("role_mapping_master").findOne({ "ApartmentId": ApartmentId,"MobileNumber":MobileNumber}).then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}




var getRolesMappingByApartmentId = function getRolesMappingByApartmentId(ApartmentId) {
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

var getTotalRolesMapping = function getTotalRolesMapping() {
    return new Promise((resolve, reject) => {
        database.getDb().collection("role_mapping_master").find({}).toArray().then(res => {
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

var insertRoleMapping = function insertRoleMapping(roleData) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("role_mapping_master").insertOne(roleData).then(res => {
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

var updateUsersRole = function updateUsersRole(apartmentId,mobileNumber,roleMappingData) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("users_master").updateOne({ "ApartmentId":apartmentId,"MobileNumber": mobileNumber },{ $set: roleMappingData }).then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}




module.exports = {
    getApartmentByMobileNumber: getApartmentByMobileNumber,
    getRolesMappingByApartmentId:getRolesMappingByApartmentId,
    getTotalRolesMapping: getTotalRolesMapping,
    onFlatQuery:onFlatQuery,
    insertRoleMapping:insertRoleMapping,
    onFlatBlockQuery:onFlatBlockQuery,
    roleIdByStatusUpdateQuery:roleIdByStatusUpdateQuery,
    editRoleByApartmentIdRoleId:editRoleByApartmentIdRoleId,
    updateUsersRole :updateUsersRole,
    getExisted:getExisted
}