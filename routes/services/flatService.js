var flatRepo = require("../repositories/flatRepo")
var jwt = require('jsonwebtoken');

var getFlats = async function getFlats(req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(ensureToken(req, res), 'my_sceret_key', async (err, loggedUser) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    console.log("loggedUser",loggedUser)
                    let loginApartmentDetails = await flatRepo.getApartmentByMobileNumber(loggedUser['loginData']['MobileNumber'])
                    let flatList = await flatRepo.getFlatsByApartmentId(loginApartmentDetails['ApartmentId'])
                    resolve(flatList)
                }
            });
        } catch (error) {
            reject(error)
        }
    })

}

var postFlats = async function postFlats(req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(ensureToken(req, res), 'my_sceret_key', async (err, loggedUser) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    var flatData = req.body;


                    var lastindex
                    var i = 0
                    var lastindexValue
                    var lastindex = await flatRepo.getTotalFlats()
                    if (lastindex.length === 0) {
                        flatData['FlatId'] = 'APSGMVDSF0';
                    } else {
                        lastindexValue = parseInt(lastindex[lastindex.length - 1]['FlatId'].replace("APSGMVDSF", ""));
                        i = ++lastindexValue;
                    }
                
                    let FlatId = 'APSGMVDSF' + i;
                    flatData['Created Date'] = new Date();
                    flatData['Updated Date'] = new Date();
                    flatData['FlatId'] = FlatId;
                
                    flatData['Active'] = "1";
                    console.log("flatData['BlockNumber']",flatData['BlockNumber'])
                    let flat
                    if(!flatData['BlockNumber']) {
                     flat = await flatRepo.onFlatQuery(flatData['FlatNumber'],flatData['ApartmentId']);

                    } else {
                     flat = await flatRepo.onFlatBlockQuery(flatData['BlockNumber'],flatData['FlatNumber'],flatData['ApartmentId']);

                    }
                    console.log("flat", flat)
                    if (flat === null) {
                        await flatRepo.insertFlat(flatData)
                       resolve({ code: "SUCCESS", message: "New Flat Created Successfully" })
                    } else {
                        return reject({ code: "ERROR", message: "Flat is Already Assigned" })
                    }
                }
            });
        } catch (error) {
            reject(error)
        }
    })

}

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
    getFlats: getFlats,
    postFlats:postFlats
}