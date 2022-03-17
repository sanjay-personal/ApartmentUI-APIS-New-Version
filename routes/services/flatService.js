var flatRepo = require("../repositories/flatRepo")
var jwt = require('jsonwebtoken');
var dataEncoderDecoder = require('../customFunctions/dataEncodeDecode');
var usersRepo = require("../repositories/signupRepo")



var getFlats = async function getFlats(req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(ensureToken(req, res), 'my_sceret_key', async (err, loggedUser) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    // console.log("loggedUser",loggedUser)
                    let loginApartmentDetails = await flatRepo.getApartmentByMobileNumber(loggedUser['loginData']['MobileNumber'])
                    // console.log("req['query']['activeUsers']",req['query']['activeUsers'], req['query']['activeUsers'] != 0 ? "a" : "b")
                    let flatList =  req['query']['activeUsers'] != 0 ? await flatRepo.getFlatsByApartmentId(loginApartmentDetails['ApartmentId'],req['query']['activeUsers']) : await flatRepo.getAllFlatsByApartmentId(loginApartmentDetails['ApartmentId'])
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
                    flatData['CreatedDate'] = new Date();
                    flatData['UpdatedDate'] = new Date();
                    flatData['FlatId'] = FlatId;
                
                    flatData['Active'] = "1";
                    // console.log("flatData['BlockNumber']",flatData['BlockNumber'])
                    let flat
                    if(!flatData['BlockNumber']) {
                     flat = await flatRepo.onFlatQuery(flatData['FlatNumber'],flatData['ApartmentId']);

                    } else {
                     flat = await flatRepo.onFlatBlockQuery(flatData['BlockNumber'],flatData['FlatNumber'],flatData['ApartmentId']);

                    }
                    // console.log("flat", flat)
                    flatData['Password'] = dataEncoderDecoder.encoder(flatData['Password'])
                    flatData['ConfirmPassword'] = dataEncoderDecoder.encoder(flatData['ConfirmPassword'])

                    if (flat === null) {
                        if (flatData['Password'] === flatData['ConfirmPassword']) {
                            let apartmentDetails = await usersRepo.getApartmentDetailsByApartmentId(flatData['ApartmentId'])
                         let user =   {
                                "ApartmentName" : apartmentDetails['ApartmentName'],
                                "MobileNumber" : flatData['MobileNumber'],
                                "Password" : flatData['Password'],
                                "ConfirmPassword" : flatData['ConfirmPassword'],
                                "ApartmentId" : flatData['ApartmentId'],
                                "CreatedDate" : flatData['CreatedDate'],
                                "UpdatedDate" :  flatData['UpdatedDate']
                            }
                            await usersRepo.insertQuery(user);
                        } else {
                            return reject({ code: "ERROR", message: "Password and ConfirmPassword are not matching" })
                        }
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


var flatStatus = async function flatStatus(req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(ensureToken(req, res), 'my_sceret_key', async (err, loggedUser) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    var body = req.body;
        var status
        var messageStatus
                    if (body['Active'] === "1") {
                        status = "0"
                        messageStatus = "Successfully InActivated the Flat"
                    } else {
                        status = "1"
                        messageStatus = "Successfully Activated the Flat"
                    }
                    await flatRepo.flatIdByStatusUpdsteQuery(body["ApartmentId"],body['FlatId'] ,status)
                    resolve({ code: "SUCCESS", message: messageStatus })

                }
            });
        } catch (error) {
            reject(error)
        }
    })

}



var getFlatByApartmentIdFlatId = async function getFlatByApartmentIdFlatId(req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(ensureToken(req, res), 'my_sceret_key', async (err, loggedUser) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                   const flatId = req.params['flatId']
                   const apartmentId = req.params['apartmentId'] 
                //    console.log("apartmentId, flatId",apartmentId, flatId)

                    if (flatId !== undefined && apartmentId !== undefined) {
                        // console.log("apartmentId, flatId",apartmentId, flatId)
                        const flat =  await flatRepo.editFlatByApartmentIdFlatId(apartmentId, flatId)
                        flat['Password'] = dataEncoderDecoder.decoder(flat['Password'])
                        flat['ConfirmPassword'] = dataEncoderDecoder.decoder(flat['ConfirmPassword'])
                       resolve(flat)
                    } else {
                        return reject({ code: "ERROR", message: "FlatId or ApartmentId Missing" })
                    }
                }
            });
        } catch (error) {
            reject(error)
        }
    })

}


var updateFlat = async function updateFlat(req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(ensureToken(req, res), 'my_sceret_key', async (err, loggedUser) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    // console.log("req.body",req.body)
                    let flatData =  req.body;
                    flatData['UpdatedDate'] = new Date();
                    flatData['Active'] = "1";
                    flatData['Password'] = dataEncoderDecoder.encoder(flatData['Password'])
                    flatData['ConfirmPassword'] = dataEncoderDecoder.encoder(flatData['ConfirmPassword'])
                    let flatId = req.body['FlatId'] ;
                    let apartmentId = req.body['ApartmentId'] ;

                    if (flatId !== undefined && apartmentId !== undefined) {
                        // console.log("apartmentId, flatId",apartmentId, flatId)
                        if (flatData['Password'] === flatData['ConfirmPassword']) {
                            let apartmentDetails = await usersRepo.getApartmentDetailsByApartmentId(flatData['ApartmentId'])
                         let user =   {
                                "ApartmentName" : apartmentDetails['ApartmentName'],
                                "MobileNumber" : flatData['MobileNumber'],
                                "Password" : flatData['Password'],
                                "ConfirmPassword" : flatData['ConfirmPassword'],
                                "ApartmentId" : flatData['ApartmentId'],
                                "CreatedDate" : flatData['CreatedDate'],
                                "UpdatedDate" :  flatData['UpdatedDate']
                            }
                            await usersRepo.updateUser(flatData['ApartmentId'],flatData['MobileNumber'],user);
                        } else {
                            return reject({ code: "ERROR", message: "Password and ConfirmPassword are not matching" })
                        }
                        await flatRepo.updateFlat(apartmentId, flatId, flatData)
                       resolve({ code: "SUCCESS", message: "Flat Updated Sucessfully" })
                    } else {
                        return reject({ code: "ERROR", message: "FlatId or ApartmentId Missing" })
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
    postFlats:postFlats,
    flatStatus:flatStatus,
    getFlatByApartmentIdFlatId:getFlatByApartmentIdFlatId,
    updateFlat:updateFlat
}