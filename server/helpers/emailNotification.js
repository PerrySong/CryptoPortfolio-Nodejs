const nodemailer = require('nodemailer');
const config = require('../config.js');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;
const uniqid = require('uniqid');
const md5 = require('md5');

//This method will send a link to the user's email, ask the user to activate his/her account
sendEmail = (req, res, subject, message, html, emailList) => {
       

    let mailOptions = {
        from: '"Crypto Team" <cryptotrackerservices@gmail.com>', // sender address
        to: emailList, // list of receivers
        subject: subject, // Subject line
        text: message, 
        html: html // html body
    };
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'cryptotrackerservices@gmail.com',
          pass: 'crypto5656'
        }  
    });
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(400).send({
                error: error
            })
        }
    })
    
},

module.exports = {
    sendEmail,
}
