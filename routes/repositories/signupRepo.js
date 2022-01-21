var manageError = require("../sharedFunctions")
var database = require("../dbconnection/db")

var onLoadSignupQuery = function onLoadSignupQuery() {
    return new Promise((resolve, reject) => {
        database.getDb().collection("sign_up").find({}).toArray().then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}

var getApartmentByMobileNumber = function getApartmentByMobileNumber(mobileNumber) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("sign_up").find({ "MobileNumber": mobileNumber }).toArray().then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}

var insertQuery = function insertQuery(signup) {
    return new Promise((resolve, reject) => {

        database.getDb().collection("sign_up").insertOne(signup, function (err, doc) {
            if (err) {
                reject(err)
            } else {
                resolve(doc)
            }
        })
    })
}

var existedLogin = function  existedLogin(login) {
    return new Promise((resolve, reject) => {
     database.getDb().collection("sign_up").findOne({ "ApartmentId": login.ApartmentId, "Password": md5(login.Password) }, function (err, doc) {
            if (err) {
                reject(err)
            } else {
                resolve(doc)
            }
        })
    })
}


module.exports = {
    onLoadSignupQuery: onLoadSignupQuery,
    insertQuery: insertQuery,
    getApartmentByMobileNumber: getApartmentByMobileNumber,
    existedLogin: existedLogin
}