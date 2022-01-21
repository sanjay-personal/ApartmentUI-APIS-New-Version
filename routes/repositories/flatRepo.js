var manageError = require("../sharedFunctions")
var database = require("../dbconnection/db")


var getApartmentByMobileNumber = function getApartmentByMobileNumber(mobileNumber) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("sign_up").findOne({ "MobileNumber": mobileNumber }).then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}

var getFlatsByApartmentId = function getFlatsByApartmentId(mobileNumber) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("apartment_master").find({ "MobileNumber": mobileNumber,"Active": "1" }).toArray().then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}


module.exports = {
    getApartmentByMobileNumber: getApartmentByMobileNumber,
    getFlatsByApartmentId:getFlatsByApartmentId
}