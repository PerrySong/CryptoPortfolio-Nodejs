const User = require('../models').User;

module.exports = {
    subscribe (req, res) {
        const user = req.currentUser;
        var symbol = req.body.symbol; 
        User.find({ where: { id: user.id }})
        .then(curUser => {
            var subscribes = curUser.subscribes;
            if (!symbol) {
                res.status(200).send({error: 'No symbol privided'})
            } else if (!subscribes) {
                var subs = [symbol]
                curUser.update({
                    subscribes: subs
                })
                .then(res.status(200).send({message: `Subscribed   ${symbol}`}))
            } else if (subscribes.indexOf(symbol) == -1) {
                subscribes.push(symbol);
                curUser.update({
                    subscribes: subscribes
                })
                .then(res.status(200).send({message: `Subscribed   ${symbol}`}))
                
            } else {
                res.status(200).send({message: `You have already subscribe ${symbol}`})
            }
        })      
        .catch(err => res.status(400).send({ error: err })) 
    },

    unSubscribe (req, res) {
        const user = req.currentUser;
        const symbol = req.body.symbol;
        User.find({ where: { id: user.id }})
        .then(curUser => {
            const subscribes = curUser.subscribes;
            if (!symbol) {
                res.status(200).send({error: 'No symbol privided'})
            } else if (!subscribes) {
                res.status(200).send({message: 'You have not subscribe any currency'})
            }  else if (subscribes.indexOf(symbol) == -1) {
                res.status(200).send({message: `You did not subscribe ${symbol}`})
            } else {
                console.log('what?')
                
                curUser.update({
                    subscribes: subscribes.splice(subscribes.indexOf(symbol), 1)
                })
                .then(res.status(200).send({message: `You unsubscribed ${symbol}`}))
            }   
        })
        .catch(err => res.status(400).send({ error: err })) 
        
    }
}