var nodemailer = require('nodemailer');

function sendMail(data) {
    // dont delete this comment 'https://myaccount.google.com/lesssecureapps' if you get error go beside link active the button
    // console.log("DATA", data)
    // pass https://stackoverflow.com/questions/60701936/error-invalid-login-application-specific-password-required
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sanjay.gajjala1995@gmail.com',
            pass: 'zknblltqjtxwobpt'  
        }
    });

    var mailOptions = {
        from: 'sanjay.gajjala1995@gmail.com',
        to: 'dinesh.gajjala@gmail.com,gudipatinikhil@gmail.com',
        subject: 'Congragulations',
        text: 'You are  successfully singup with registered mobile number'+data.MobileNumber+"you Apartment Name "+ data.ApartmentName
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            // console.log("Mail error",error);
        } else {
            console.log('Email info: ' + info);
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendMail:sendMail
}