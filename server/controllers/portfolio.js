const Portfolio = require('../models').Portfolio;
const Coin = require('../models').Coin;
const Transaction = ('../model').Transaction;


module.exports = {
    makeTransaction(req, res) {

    },

    currentAsset(req, res) {
        const user = req.currentUser;
        if(user) {
            // console.log(Portfolio.findOrCreate);
            console.log('hey')
            Portfolio.findOrCreate({where: {userId: user.id}, defaults: {id: ''}})
            .then(portfolio => {
                
                return Coin.findAll({where: {portfolioId: portfolio.id}})
                .then(coins => res.status(200).send(coins))
                .catch(err => res.status(400).send({
                    error: err,
                }))
            })    
            .catch(err => res.status(404).send({
                error: err
            }))
        } else {
            res.status(404).send({
                error: 'Please login'
            })
        }
    }
}