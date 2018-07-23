const User = require('../models').User,
      Portfolio = require('../models').Portfolio,
      Coin = require('../models').Coin,
      raccoon = require('raccoon');
   
/**
    K-Nearest Neighbors Algorithm for Recommendations
    To deal with large user bases, it's essential to make optimizations that don't involve 
    comparing every user against every other user. One way to deal with this is using the K-Nearest 
    Neighbors algorithm which allows you to only compare a user against their 'nearest' neighbors. 
    After a user's similarity is calculated with the Jaccard Coefficient, a sorted set is created which 
    represents how similar that user is to every other. The top users from that list are considered their 
    nearest neighbors. recommendation Raccoon uses a default value of 5, but this can easily be changed 
    based on your needs.
*/
const recommendCoins = (req, res, userToCoin, username, recommendNumber, recommendMethod) => {
    //To be continue....
    Object.keys(userToCoin).forEach(username => {
        Object.keys(userToCoin[username]).forEach(coin => {
            if (userToCoin[username][coin] > 0) {
                raccoon.liked(username, coin);
            } else if (userToCoin[username][coin] < 0) {
                raccoon.disliked(username, coin);
            }
        })
    })
    console.log(recommendMethod)
    // If the method is recommendCoins: 
    if (recommendMethod === 'recommendCoins') {
        raccoon.recommendFor(username, recommendNumber).then((results) => {
            console.log(results)
            res.status(200).send(results)
        });
    } else if (recommendMethod === 'recommendUsers') {
        raccoon.mostSimilarUsers(username).then((results) => {
            res.status(200).send(results)
        });
    } else {

        res.status(400).send({error: 'Please provide a valid recommend method'})
    }

}


const recommend = (req, res) => {
    const recommendNumber = req.body.number
    const recommendMethod = req.body.method
    var userToCoin = new Object;
    
    User.findAll()
    .then(function(users) {
        if (users) {
            users.map(function(user) {
                if (user) {
                    Portfolio.findOne({where:{userId: user.id}})
                    .then(portfolio => {
                        if (portfolio) {
                            Coin.findAll({where:{portfolioId: portfolio.id}})
                            .then(coins => {
                                const coinToAmount = new Object;
                                coins.forEach(coin => {
                                    coinToAmount[coin.type] = coin.amount;
                                });
                                return coinToAmount;
                            })
                            .then(coinToAmount => {
                                userToCoin[user.username] = coinToAmount
                            })
                            .catch(err => console.log("ERORRRRRRRRRRR" + err))
                            
                        }
                    })
                    .catch(err => console.log("ERORRRRRRRRRRR" + err))  
                }
            })
        }
        
    })
    .catch(err => console.log("ERORRRRRRRRRRR" + err)) 

    setTimeout(function(){
        recommendCoins(req, res, userToCoin, req.currentUser.username, recommendNumber, recommendMethod);       
    },100);

    return userToCoin;         
}

module.exports = {
    recommend
}   
