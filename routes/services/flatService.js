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
    getFlats: getFlats
}