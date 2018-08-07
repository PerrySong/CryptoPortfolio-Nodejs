const nodemailer = require('nodemailer');
const config = require('../config.js');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;
const uniqid = require('uniqid');
const md5 = require('md5');
const teamEmail = 'cryptotrackerservices@gmail.com';
const teamEmailPassword = 'Spf13609629560';

//This method will send a link to the user's email, ask the user to activate his/her account
sendVerifyEmail = (req, res) => {
    let verify_link = config.base_url + 
            'verify/' +
            jwt.sign({ 
                id: uniqid("user-"),
                email: req.body.email,
                username: req.body.username,
                password: md5(req.body.password),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                public: true
            }, secret, { expiresIn: '24h' });

    let massage = 'Welcome to crypto tracker, ' +
        '<br /> Please go to the link below to activate your account. <br />' +
        '<br /><a href="' + verify_link + '">Active Account Now!</a>';
       
    let mailOptions = {
        from: '"Crypto Team" <cryptotrackerservices@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Activate you CryptoTracker Account!', // Subject line
        text: 'Activate you CryptoTracker Account!', 
        html: massage // html body
    };
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: teamEmail,
          pass: teamEmailPassword
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
    sendVerifyEmail,
}
