const User = require('../models').User;
const Portfolio = require('../models').Portfolio;
const Coin = require('../models').Coin;
const Transaction = require('../models').Transaction;
const Profile = require('../models').Profile;
const cryptoNameToSymbol = require('./cryptoSearch/cryptocurrencies')



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
                        updateWallet(user.id, curPortfolio, newTransaction.sell_type, -newTransaction.sell_amount)
                        updateWallet(user.id, curPortfolio, newTransaction.income_type, newTransaction.income_amount)
                    })
                    .catch(err => console.log({error: err}));
                } else {
                    console.log("Error: unable to make transaction")
                }
            })
        });
    })
}

