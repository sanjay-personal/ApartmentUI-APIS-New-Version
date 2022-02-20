var manageError = require("../sharedFunctions")
var database = require("../dbconnection/db");
const { encoder } = require("../customFunctions/dataEncodeDecode");

var onLoadSignupQuery = function onLoadSignupQuery() {
    return new Promise((resolve, reject) => {
        database.getDb().collection("users_master").find({}).toArray().then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}

var getApartmentByMobileNumber = function getApartmentByMobileNumber(mobileNumber) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("users_master").find({ "MobileNumber": mobileNumber }).toArray().then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}

var insertQuery = function insertQuery(signup) {
    return new Promise((resolve, reject) => {

        database.getDb().collection("users_master").insertOne(signup, function (err, doc) {
            if (err) {
                reject(err)
            } else {
                resolve(doc)
            }
        })
    })
}

var updateUser = function updateUser(apartmentId,mobileNumber,user) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("flat_master").updateOne({ "ApartmentId":apartmentId,"MobileNumber": mobileNumber },{ $set: user }).then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}

var existedLogin = function  existedLogin(login) {
    return new Promise((resolve, reject) => {
     database.getDb().collection("users_master").findOne({ "ApartmentId": login.ApartmentId, "Password": encoder(login.Password) }, function (err, doc) {
            if (err) {
                reject(err)
            } else {
                resolve(doc)
            }
        })
    })
}

var getApartmentDetailsByApartmentId = function  getApartmentDetailsByApartmentId(ApartmentId) {
    return new Promise((resolve, reject) => {
     database.getDb().collection("users_master").findOne({ "ApartmentId": ApartmentId}, function (err, doc) {
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
    existedLogin: existedLogin,
    getApartmentDetailsByApartmentId:getApartmentDetailsByApartmentId,
    updateUser:updateUser
}