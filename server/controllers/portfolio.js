const Portfolio = require('../models/portfolio');
const Coin = require('../models/coin');
const Transaction = ('../model/transaction');


module.exports = {
    makeTransaction(req, res) {

    },

    currentAsset(req, res) {
        if(req.user) {
            Portfolio.findOne({where: {id: user.id}})
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