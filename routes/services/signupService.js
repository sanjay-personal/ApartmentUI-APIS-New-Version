var signupRepo = require("../repositories/signupRepo")
var dataEncoderDecoder = require('../customFunctions/dataEncodeDecode');
var mailTransport = require('../customFunctions/mailTransport')
var singupCreate = async function singupCreate(req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            var signup = req.body;
            var lastindex
            var i = 0  
            var lastindexValue
            var insertQuery
            var crossCheckingApartment
            crossCheckingApartment = await signupRepo.getApartmentByMobileNumber(signup["MobileNumber"])
            if (crossCheckingApartment.length > 0) {
                return reject({ code: "ERROR", message: "Your Mobile Number is Already Existed" })

            }

            var lastindex = await signupRepo.onLoadSignupQuery();
            if (lastindex.length === 0) {
                signup['ApartmentId'] = 'APSGMVDS0';
            } else {
                lastindexValue = parseInt(lastindex[lastindex.length - 1]['ApartmentId'].replace("APSGMVDS", ""));
                i = ++lastindexValue;
            }

            let ApartmentId = 'APSGMVDS' + i;
            signup['Password'] = dataEncoderDecoder.encoder(signup['Password']);
            signup['ConfirmPassword'] = dataEncoderDecoder.encoder(signup['ConfirmPassword']);
            signup['ApartmentId'] = ApartmentId;
            signup['CreatedDate'] = new Date();
            signup['UpdatedDate'] = new Date();
            // console.log("encoderrrrr",signup['Password'],dataEncoderDecoder.decoder(signup['Password']))
            if (signup['Password'] === signup['ConfirmPassword']) {
                insertQuery = await signupRepo.insertQuery(signup);
                mailTransport.sendMail(signup)
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