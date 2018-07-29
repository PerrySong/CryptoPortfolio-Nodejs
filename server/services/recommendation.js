const User = require('../models').User,
      Portfolio = require('../models').Portfolio,
      Coin = require('../models').Coin,
      raccoon = require('raccoon'),
      Sequelize = require('sequelize'),
      Op = Sequelize.Op;
   
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
const recommendCoins = (req, res) => {
    var recommendNumber = req.body.number
    const recommendMethod = req.body.method
    const user = req.currentUser
    Portfolio.find({where:{userId:user.id}})
    .then(portfolio => {
        if (recommendMethod == 'recommendCoins') {
            raccoon.recommendFor(portfolio.id, recommendNumber).then((results) => {
                console.log(results)
                res.status(200).send(results)
            });
        } else if (recommendMethod == 'recommendPortfolio') {
            // raccoon.mostSimilarUsers('portfolioId').then((results) => {
            //     // returns an array of the 'similarityZSet' ranked sorted set for the user which
            //     // represents their ranked similarity to all other users given the
            //     // Jaccard Coefficient. the value is between -1 and 1. -1 means that the
            //     // user is the exact opposite, 1 means they're exactly the same.
            //     // ex. results = ['garyId', 'andrewId', 'jakeId']
            // });
        }
        
    })  
}


const updateSimilarity = (req, res) => {
    const user = req.currentUser;
    User.find({ where : {id: user.id } })
    .then(curUser => {
        var mySubs = curUser.suscribes
        User.findAdd() //Contains 'me'
        .then(users => {
            
        })
    })
   
}

module.exports = {
    recommendCoins,
    updateSimilarity
}   
