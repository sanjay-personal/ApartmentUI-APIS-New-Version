var database = require("../dbconnection/db")





var onFlatByMaintenancePostQuery = function onFlatByMaintenancePostQuery(maintenanceData) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("maintenance_master").insertOne(maintenanceData).then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}

var onFlatNumberByMaintenanceDateQuery = function onFlatNumberByMaintenanceDateQuery(apartmentId, flatId, month, year) {
    return new Promise((resolve, reject) => {
        database.getDb().collection("maintenance_master").findOne({ "ApartmentId":apartmentId,"FlatId": flatId, "Month":month, "Year":year }).then(res => {
            resolve(res)
        }, (error) => {
            return reject(error);
        });
    });
}





module.exports = {
    onFlatNumberByMaintenanceDateQuery:onFlatNumberByMaintenanceDateQuery,
    onFlatByMaintenancePostQuery:onFlatByMaintenancePostQuery
}