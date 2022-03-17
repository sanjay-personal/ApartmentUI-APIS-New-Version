var flatRepo = require("../repositories/flatRepo")
var jwt = require('jsonwebtoken');
var maintenanceRepo = require("../repositories/maintenanceRepo");
var dateModify = require("../customFunctions/dateModify");




var getMaintenance = async function getMaintenance(req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(ensureToken(req, res), 'my_sceret_key', async (err, loggedUser) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    // console.log("loggedUser",loggedUser)
                    let year
                    let month 
                    if(Object.keys(req.query).length === 0) {
                     year = dateModify.getFormattedDate(new Date(),'YYYY')
                     month = dateModify.getFormattedDate(new Date(),'MMMM')

                    } else {
                     year = req.query['year']
                     month = req.query['month']

                    }
                    let loginApartmentDetails = await flatRepo.getApartmentByMobileNumber(loggedUser['loginData']['MobileNumber'])
                    let flatList 
                    if(month !== '') {
                     flatList = await maintenanceRepo.getMaintenanceDateByApartmentIdQuery(loginApartmentDetails['ApartmentId'],month,year)

                    } else {
                        flatList = await maintenanceRepo.getMaintenanceDateByApartmentIdByYearQuery(loginApartmentDetails['ApartmentId'],year)

                    }
                    resolve(flatList)
                }
            });
        } catch (error) {
            reject(error)
        }
    })

}

var postMaintenance = async function postMaintenance(req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(ensureToken(req, res), 'my_sceret_key', async (err, loggedUser) => {
                if (err) {
                    res.sendStatus(403);
                } else {
        var maintenanceData = req.body;
        maintenanceData['CreatedDate'] = new Date();
        maintenanceData['UpdatedDate'] = new Date();
        maintenanceData['Month'] = dateModify.getFormattedDate(maintenanceData['MaintenanceDate'], 'MMMM');
        maintenanceData['MonthNumber'] = dateModify.getFormattedDate(maintenanceData['MaintenanceDate'], 'M');
        maintenanceData['Year'] =dateModify.getFormattedDate(maintenanceData['MaintenanceDate'], 'YYYY')
        maintenanceData['Day'] =dateModify.getFormattedDate(maintenanceData['MaintenanceDate'], 'dddd')
        let maintenanceCheck = await maintenanceRepo.onFlatNumberByMaintenanceDateQuery(maintenanceData['ApartmentId'], maintenanceData['FlatId'], maintenanceData['Month'], maintenanceData['Year']);
            if (maintenanceCheck === null) {
                await maintenanceRepo.onFlatByMaintenancePostQuery(maintenanceData);
                resolve({ code: 'SUCCESS', message: "Your Maintenance Amount is Successfully Created" });
            } else {
                reject({ code: 'ERROR', message: "Already You Paid Maintenance on this Date " + maintenanceCheck['MaintenanceDate']});

            }
                }
            });
        } catch (error) {
            reject(error)
        }
    })

}

// app.post("/api/maintenance", async function (req, res) {

//     jwt.verify(ensureToken(req, res), 'my_sceret_key', async (err, loggedUser) => {
//         var maintenanceData = req.maintenanceData;
//         maintenanceData['CreatedDate'] = new Date();
//         maintenanceData['UpdatedDate'] = new Date();
//         maintenanceData['Month'] = getFormattedDate(maintenanceData['MaintenanceDate'], 'MMMM');
//         maintenanceData['Year'] = getFormattedDate(maintenanceData['MaintenanceDate'], 'YYYY')
//         if (err) {
//             res.sendStatus(403);
//         } else {

//             let maintenanceCheck = await onFlatNumberByMaintenanceDateQuery(maintenanceData['FlatNumber'], maintenanceData['Month'], maintenanceData['Year']);
//             console.log("maintenanceCheck", maintenanceCheck)
//             if (maintenanceCheck === null) {
//                 let maintenance = await onApartmentsByMaintenancePostQuery(maintenanceData);
//                 res.status(200).json({ primary: maintenance, status: { code: 'SUCCESS', message: "Your Maintenance Amount is Successfully Created" } });
//             } else {
//                 res.status(200).json({ status: { code: 'ERROR', message: "Already You Paid Maintenance on this Date " + maintenanceCheck['MaintenanceDate'] } });

//             }
//         }
//     });
// });

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
    getMaintenance: getMaintenance,
    postMaintenance:postMaintenance
}