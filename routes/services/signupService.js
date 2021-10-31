var signupRepo = require("../repositories/signupRepo")
var md5 = require('md5');
var singupCreate = async function singupCreate(req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            var signup = req.body;
            var lastindex
            var i = 0
            var lastindexValue
            var insertQuery
            var crossCheckingApartment
            crossCheckingApartment = await signupRepo.getApartmentName(signup["ApartmentName"])
            if (crossCheckingApartment.length > 0) {
                return reject({ code: "ERROR", message: "Your Apartment Name is Already Exist" })

            }

            var lastindex = await signupRepo.onLoadSignupQuery();
            if (lastindex.length === 0) {
                signup['ApartmentId'] = 'APSGMVDS0';
            } else {
                lastindexValue = parseInt(lastindex[lastindex.length - 1]['ApartmentId'].replace("APSGMVDS", ""));
                i = ++lastindexValue;
            }

            let ApartmentId = 'APSGMVDS' + i;
            signup['Password'] = md5(signup['Password']);
            signup['ConfirmPassword'] = md5(signup['ConfirmPassword']);
            signup['ApartmentId'] = ApartmentId;
            signup['Created Date'] = new Date();
            signup['Updated Date'] = new Date();
            if (signup['Password'] === signup['ConfirmPassword']) {
                insertQuery = await signupRepo.insertQuery(signup);
                return resolve(insertQuery)
            } else {
                return reject({ code: "ERROR", message: "Password and ConfirmPassword are not matching" })
            }
        } catch (error) {
            reject(error)
        }
    })

}

module.exports = {
    singupCreate: singupCreate
}