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

var getApartmentName = function getApartmentName(apartmentName) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("sign_up").find({ "ApartmentName": apartmentName }).toArray().then(res => {
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

module.exports = {
    onLoadSignupQuery: onLoadSignupQuery,
    insertQuery: insertQuery,
    getApartmentName: getApartmentName
}