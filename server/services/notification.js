const nodemailer = require('nodemailer');
const hmtlTemplate = require('../views/emailHtmlTemplate');
const User = require('../models').User
const Portfolio = require('../models').Portfolio
const Coin = require('../models').Coin
const cryptoCompare = require('./cryptoCompare')

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

sendEmailNotification = (subject, message, firstname, content, emailList) => {
    
    let html = hmtlTemplate.formNotificationHtml(firstname, content);
    console.log(html);

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
            console.log("error: " + error);
        }
    })
    
},

formDailyAlert = (user) => {
    Portfolio.findOne({where: {userId: user.id}})
    .then(portfolio => {
        Coin.findAll({where: {portfolioId: portfolio.id}})
        .then(coins => {
            let maxCoin = coins[0];
            for (let i = 1; i < coins.length; i++) {
                if (coins[i].amount > maxCoin.amount) {
                    maxCoin = coins[i];
                }
            }
            if (maxCoin) {
                let d = new Date(); // Today!
                d.setDate(d.getDate() - 1); // Yesterday!
                let info = cryptoCompare.histoDay(maxCoin.type, 'USD', d);
                let message = `The ${maxCoin.type} high is ${info}`
            }
        })
    })
    .catch()
    return "Test now"
}

pushNotification = () => {
    const subject = 'Crypto Currency Flutuate'
    
    User.findAll({})
    .then(users => {
        for(let i = 0; i < users.length; i++) {
            if(users[i].public === true) {
                const content = formDailyAlert(users[i]);
                sendEmailNotification(subject, '', users[i].firstname, content, users[i].email);
            }
        }
    })
}


module.exports = {
    sendEmail,
    pushNotification
}
