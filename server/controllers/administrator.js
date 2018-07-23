const User = require('../models').User;
const emailNotification = require('../helpers/emailNotification');


module.exports = {
    sendEmail(req, res) {

        const subject = req.body.subject;
        const message = req.body.message;
        const html = req.body.html;
        User.findAll().then(users => {
            let emailList = users.map(user => { return user.email })
            let arrLength = users.length;
            emailNotification.sendEmail(req, res, subject, message, html, emailList);
            
        })
    }
}