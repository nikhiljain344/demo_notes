const fs = require('fs')
const path = require("path");
const nodemailer = require('nodemailer');
const utills = require("./utills");

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "nj344nj@gmail.com",
        pass: "Nikhil@3jain"
    },
});

function SendEmail(email, subject, otp) {
    var mailOptions = {
        from: 'nj344nj@gmail.com',
        to: email,
        subject,
        html: `<h1>${otp}</h1>`
        // html: fs.readFileSync(path.resolve(__dirname, './tamplate.html'), 'utf8')
    };
    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error, 'Error in procesing');
        } else {
            console.log(otp, 'Mail Sent Successfully');
        }
    });
};
module.exports = {
    SendEmail: SendEmail
}