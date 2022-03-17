var manageError = require("../sharedFunctions")
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

var getFlatsByApartmentId = function getFlatsByApartmentId(ApartmentId,activeusers) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("flat_master").find({ "ApartmentId": ApartmentId,"Active":activeusers}).toArray().then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}

var getAllFlatsByApartmentId = function getAllFlatsByApartmentId(ApartmentId) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("flat_master").find({ "ApartmentId": ApartmentId}).toArray().then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}

var flatIdByStatusUpdsteQuery= function flatIdByStatusUpdsteQuery(apartmentId,flatId, status) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("flat_master").updateOne({"ApartmentId": apartmentId, "FlatId": flatId }, { $set: { "Active": status } }).then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}

var getTotalFlats = function getTotalFlats() {
    return new Promise((resolve, reject) => {
        database.getDb().collection("flat_master").find({}).toArray().then(res => {
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

var insertFlat = function insertFlat(flatData) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("flat_master").insertOne(flatData).then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}

var editFlatByApartmentIdFlatId = function editFlatByApartmentIdFlatId(apartmentId, flatId) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("flat_master").findOne({ "ApartmentId":apartmentId,"FlatId": flatId }).then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}

var updateFlat = function updateFlat(apartmentId,flatId,flatData) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("flat_master").updateOne({ "ApartmentId":apartmentId,"FlatId": flatId },{ $set: flatData }).then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}




module.exports = {
    getApartmentByMobileNumber: getApartmentByMobileNumber,
    getFlatsByApartmentId:getFlatsByApartmentId,
    getTotalFlats: getTotalFlats,
    onFlatQuery:onFlatQuery,
    insertFlat:insertFlat,
    onFlatBlockQuery:onFlatBlockQuery,
    flatIdByStatusUpdsteQuery:flatIdByStatusUpdsteQuery,
    editFlatByApartmentIdFlatId:editFlatByApartmentIdFlatId,
    updateFlat :updateFlat,
    getAllFlatsByApartmentId:getAllFlatsByApartmentId
}