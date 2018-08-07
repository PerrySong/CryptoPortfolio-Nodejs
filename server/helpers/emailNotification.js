const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const hmtlTemplate = require('../views/emailHtmlTemplate');
const teamEmail = 'cryptotrackerservices@gmail.com';
const teamEmailPassword = 'Spf13609629560';

sendEmail = (req, res, subject, message, html, emailList) => {
     
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: teamEmail,
            pass: teamEmailPassword
        }  
    });

    emailList.forEach((email, i, array) => {
        let content = {
            from: '"Crypto Team" <cryptotrackerservices@gmail.com>', // sender address
            subject: subject || "Greeting from CryptoTracker team!", // Subject line
            text: message || "How are you today?", 
            html: html || "<h1>Hope you have a great day!</h1>"// html body
        }
        content.to = email;
        transporter.sendMail(content, (error, info) => {
            if (error) {
                // console.log(i)
            }
        })
        console.log(i)
        console.log("emaillist length = " + emailList.length)
        if (i === emailList.length - 1) { transporter.close(); }
    })
    
    res.status(200).send({
        message: "The notification has been pushed"
    })
},

sendEmailNotification = (subject, message, user, content, emailList) => {
    
    let html = hmtlTemplate.formNotificationHtml(user, content);

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
            user: teamEmail,
            pass: teamEmailPassword
        }  
    });
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("error: " + error);
        }
    })
    
},



module.exports = {
    sendEmail,
}
