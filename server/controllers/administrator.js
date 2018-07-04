const User = require('../models').User;
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;
const uniqid = require('uniqid');
const emailVerification = require('../helpers/emailVerification');
const md5 = require('md5');
const emailNotification = require('../helpers/emailNotification');


module.exports = {
    sendEmail(req, res) {

        const subject = req.body.subject;
        const message = req.body.message;
        const html = req.body.html;
        User.findAll().then(users => {
            //Following code will show the all the users' emails for every user
            // const emailList = users.map(user => {
            //                         if(user.public)
            //                             return user.email});
            // emailNotification.sendEmail(req, res, subject, message, html, emailList);
            let arrLength = users.length;
            for(let i = 0; i < arrLength; i++) {
                emailNotification.sendEmail(req, res, subject, message, html, users[i].email);
            }
        })

       
    }
}