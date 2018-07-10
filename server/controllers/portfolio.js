const Portfolio = require('../models').Portfolio;
const Coin = require('../models').Coin;
const Transaction = require('../models').Transaction;

updateWallet = (portfolio, type, amount) => {
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
                    amount: newAmount
                })
                .catch((err) => res.status(400).send({error: err}));
            } else {
                return Coin
                .create({
                    type: type,
                    amount: amount,
                    portfolioId: portfolio.id
                })
                .then(curCoin => console.log(curCoin))
                .catch((err) => res.status(400).send({error: err}));
            }
        })
        .catch(err => res.status(400).send(err));
    } else {
        return res.status(403).send({message: 'portfolio error' })
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
                        portfolioId: curPortfolio.id
                    })
                    .then(newTransaction => {
                        
                        updateWallet(curPortfolio, req.body.sell_type, -req.body.sell_amount),
                        updateWallet(curPortfolio, req.body.income_type, req.body.income_amount),
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

    listPortfolio(req, res) {
            return Coin
                .findAll({
    
                })
                .then((ps) => res.status(200).send(ps))
                .catch((error) =>   {
                    res.status(400).send(error)
                    console.log("error = " + error)
                });
        },
}