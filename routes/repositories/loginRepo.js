var manageError = require("../sharedFunctions")
var database = require("../dbconnection/db")



var getApartmentByMobileNumber = function getApartmentByMobileNumber(mobileNumber,password) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("sign_up").find({ "MobileNumber": mobileNumber,"Password":password }).toArray().then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}

module.exports = {
    getApartmentByMobileNumber: getApartmentByMobileNumber
}