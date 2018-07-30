const User = require('../models').User;
const emailNotification = require('../services/notification');


module.exports = {
    sendEmail(req, res) {
        const subject = req.body.subject;
        const message = req.body.message;
        const content = req.body.content;
        const html = req.body.html;
        User.findAll().then(users => {
            let emailList = users.map(user => { return user.email })
            let arrLength = users.length;
            for (var i = 0; i < arrLength; i++) {
                emailNotification.sendEmail(req, res, subject, message, content, emailList[i], users[i].firstname)
            }
            
        })
        .then(res.status(200).send({ message: 'Success' }))
        .catch(err => res.status(200).send({ error: err }))
    }
}