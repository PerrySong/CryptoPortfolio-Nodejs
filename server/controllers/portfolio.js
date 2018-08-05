const Portfolio = require('../models').Portfolio;
const Coin = require('../models').Coin;
const Transaction = require('../models').Transaction;
const getUsersAsset = require('../services/getUsersAsset');


updateWallet = (userId, portfolio, type, amount) => {
    console.log("Here!!!")
    if (portfolio){
        Coin.findOne({
            where: {
              portfolioId: portfolio.id,
              type: type
            }
        })
        .then(curCoin => {
            console.log(curCoin)
            if (curCoin){
                let newAmount = Number(curCoin.amount) + Number(amount)
                curCoin.update({
                    amount: newAmount,
                    userId: userId
                })
                .catch((err) => res.status(400).send({error: err}));  // Did not pass 'res' to updateWallet
            } else {
                return Coin
                .create({
                    type: type,
                    amount: amount,
                    portfolioId: portfolio.id,
                    userId: userId
                })
                .then(curCoin => console.log(curCoin))
                .catch((err) => res.status(400).send({error: err})); // Did not pass 'res' to updateWallet
            }
        })
        .catch(err => res.status(400).send(err)); // Did not pass 'res' to updateWallet
    } else {
        return res.status(403).send({message: 'portfolio error' }) // Did not pass 'res' to updateWallet
    }
}

module.exports = {

    createTransaction(req, res) {
        
        const user = req.currentUser;
        if (user) {
            Portfolio.findOne({
                where: {
                    userId: user.id
                }
            })
            .then(curPortfolio => {
                if (curPortfolio){
                    console.log("Here!!!")
                    return Transaction
                    .create({
                        // need to coop makeTransaction method in Portfolio controller
                        sell_type: req.body.sell_type,
                        sell_price: req.body.sell_price,
                        sell_amount: req.body.sell_amount,
                        income_type: req.body.income_type,
                        income_price: req.body.income_price,
                        income_amount: req.body.income_amount,
                        portfolioId: curPortfolio.id,
                        userId: user.id
                    })
                    .then(newTransaction => {
                        
                        updateWallet(user.id, curPortfolio, req.body.sell_type, -req.body.sell_amount),
                        updateWallet(user.id, curPortfolio, req.body.income_type, req.body.income_amount),
                        res.status(200).send(newTransaction)
                    })
                    .catch(err => res.status(400).send({error: err}));
                } else {
                    res.status(403).send({message: 'No portfolio'});
                }
            })
            .catch(err => res.status(400).send({error: err}));
        } else {
            res.status(403).send({message: 'Please log in'});
        }
    },

    getAUserAsset(req, res) {
        getUsersAsset.getUserAsset(req.body.userId)
        .then(assets => {
            if (assets) {
                res.status(200).send(asset)
            }
        })
        .catch(err => res.status(200).send({error: err}))
    },

    currentAsset(req, res) {
        const user = req.currentUser;
        if (user) {
            Portfolio.findOne({where: {userId: user.id}})

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
    },

    transactionHistory(req, res) {
        userId = req.currentUser.id;
        Portfolio.findOne({where: {userId: userId}})
        .then(portfolio => {
            Transaction.findAll({where: {portfolioId: portfolio.id}})
            .then(transactions => {
                res.status(200).send(transactions)
            })
            .catch(err => res.status(404).send({
                error: err
            }))
            
        })
        .catch(err => res.status(404).send({
            error: err
        }))
    },

    listPortfolio(req, res) {
        return Coin
            .findAll()
            .then((ps) => res.status(200).send(ps))
            .catch((error) =>   {
                res.status(400).send(error)
                console.log("error = " + error)
            });
    },
}