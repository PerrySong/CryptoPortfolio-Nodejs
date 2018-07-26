'use strict'
const User = require('../models').User;
const Portfolio = require('../models').Portfolio;
const Coin = require('../models').Coin;
const Transaction = require('../models').Transaction;
const Profile = require('../models').Profile;
const cryptoNameToSymbol = require('./cryptoSearch/cryptocurrencies')



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
                .catch(err => console.log(err));
            } else {
                return Coin
                .create({
                    type: type,
                    amount: amount,
                    portfolioId: portfolio.id
                })
                .then(curCoin => console.log(curCoin))
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
    } else {
        return console.log('message: portfolio error')
    }
}


const randomKey = (obj) => {
    var keys = Object.keys(obj)
    return keys[ keys.length * Math.random() << 0];
};

const randomTransaction = () => {
    let transaction = new Object;
    console.log(randomKey(cryptoNameToSymbol))
    transaction.sell_type = randomKey(cryptoNameToSymbol.nameToSymbol);
    transaction.income_type = randomKey(cryptoNameToSymbol.nameToSymbol);
    transaction.sell_price = 1;
    transaction.income_price = 1;
    transaction.sell_amount = 1;
    transaction.income_amount = 1;
    return transaction
}

console.log(process.argv[0])
console.log(Number(process.argv[0]))

for (var i = 0; i < 1000; i++) {
    console.log('Making a random trasaction for every user')
    User.findAll()
    .then(users => {
        users.map(user => {
            Portfolio.findOne({
                where: {
                    userId: user.id
                }
            })
            .then(curPortfolio => {
                if (curPortfolio){
                    console.log("Here!!!")
                    return Transaction
                    .create(randomTransaction())
                    .then(newTransaction => {
                        updateWallet(curPortfolio, newTransaction.sell_type, -newTransaction.sell_amount)
                        updateWallet(curPortfolio, newTransaction.income_type, newTransaction.income_amount)
                    })
                    .catch(err => console.log({error: err}));
                } else {
                    console.log("Error: unable to make transaction")
                }
            })
        });
    })
}

