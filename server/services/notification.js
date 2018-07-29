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
    

}

pushNotification = () => {
    console.log("pushNotification")
    const subject = 'Crypto Currency Flutuate'
    
    User.findAll({})
    .then(users => {
        for(let i = 0; i < users.length; i++) {
            if(users[i].public === true) {
                subscribeCoins = users[i].subscribes
                console.log(subscribeCoins[0])
                let d = new Date(); // Today!
                d.setDate(d.getDate() - 1); // Yesterday!
                cryptoCompare.histoDay(maxCoin.type, 'USD', {timestamp: d})
                .then(info => {
                    let message = `The ${maxCoin.type} high: ${info[0].high}, low: ${info[0].low}, close: ${info[0].close}, open: ${info[0].open}`
                    return message
                })
                .then(message => {
                    console.log("message: " + message);
                    sendEmailNotification(subject, '', users[i].firstname, message, users[i].email);
                })
                .catch(error => console.log(error))

                // Portfolio.findOne({where: {userId: users[i].id}})
                // .then(portfolio => {
                //     if(portfolio) {
                        
                //     //     //If current user has portfolio:
                //     //     Coin.min('amount') // !!!!not right!!!
                //     //     .then(max => {
                //     //         Coin.findOne({where: {'amount': max}})
                //     //         .then(maxCoin => {
                //     //             console.log(maxCoin)
                //     //             let d = new Date(); // Today!
                //     //             d.setDate(d.getDate() - 1); // Yesterday!
                //     //             if (maxCoin) {
                //     //                 cryptoCompare.histoDay(maxCoin.type, 'USD', {timestamp: d})
                //     //                 .then(info => {
                //     //                     let message = `The ${maxCoin.type} high: ${info[0].high}, low: ${info[0].low}, close: ${info[0].close}, open: ${info[0].open}`
                //     //                     return message
                //     //                 })
                //     //                 .then(message => {
                //     //                     console.log("message: " + message);
                //     //                     sendEmailNotification(subject, '', users[i].firstname, message, users[i].email);
                //     //                 })
                //     //                 .catch(error => console.log(error))
                                    
                //     //             } else {
                //     //                 cryptoCompare.histoDay('BTC', 'USD', d)
                //     //                 .then(info => {
                //     //                     let message = `The BTC high: ${info[0].high}, low: ${info[0].low}, close: ${info[0].close}, open: ${info[0].open}`
                //     //                     return message
                //     //                 })
                //     //                 .then(message => {
                //     //                     console.log("message: " + message);
                //     //                     sendEmailNotification(subject, '', users[i].firstname, message, users[i].email);
                //     //                 })
                //     //                 .catch(error => console.log(error))
                //     //             } 
                //     //         })
                //     //         .catch(error => console.log(error))
                //     //     })
        
                //     //     .catch(error => {
                //     //         console.log(error);
                //     //     })
                //     } else {
                //         console.log(`User ${users[i].id} do not has portfolio`)
                //     }
                    
                // })
                // .catch(error => {
                //     console.log(error);
                // })

            }
        }
    })
}


module.exports = {
    sendEmail,
    pushNotification
}
