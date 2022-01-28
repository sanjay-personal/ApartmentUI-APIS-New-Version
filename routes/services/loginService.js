var loginRepo = require("../repositories/loginRepo")
var jwt = require('jsonwebtoken');
var md5 = require('md5');


var existedLogin = async function existedLogin(loginData) {
    return new Promise(async (resolve, reject) => {
        try {

            var crossCheckingLogin
            crossCheckingLogin = await loginRepo.getApartmentByMobileNumber(loginData["MobileNumber"],md5(loginData["Password"]))
            if (crossCheckingLogin.length > 0) {
                console.log("crossCheckingLogin",crossCheckingLogin)
                 const token = jwt.sign({ loginData }, 'my_sceret_key');
                 const doc = crossCheckingLogin[0]
                 resolve({ "token": token, "ApartmentName": doc.ApartmentName, "ApartmentId": doc.ApartmentId, "MaintenanceAmount": doc.MaintenanceAmount });
            } else {
                return reject({ code: "ERROR", message: "You Not a Valid User" })

            }

        } catch (error) {
            reject(error)
        }
    })

}

module.exports = {
    existedLogin: existedLogin
}