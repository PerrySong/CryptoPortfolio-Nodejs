const User = require('../models').User,
      Portfolio = require('../models').Portfolio,
      Coin = require('../models').Coin

    const getUsersAsset = () => {
        return User.findAll({
            include: [
              {
                model: Coin,
                as: 'coins'
              }
            ]
          }).then(users => {
            const resObj = users.map(user => {
                if (user) {
                    console.log(user.coins)
                    return Object.assign(
                        {},
                        {
                            userId: user.id,
                            username: user.username,
                            coins: JSON.stringify(user.coins)
                        }
                    )
                }
            })
            return resObj
        })
    } 

    const getPortfolioAsset = () => {
        return Portfolio.findAll({
            include: [
                {
                  model: Coin,
                  as: 'coin'
                }
            ]
        }).then(portfolios => {
            const resObj = portfolios.map(portfolio => {
                if (portfolio) {
                    return Object.assign(
                        {},
                        {
                            portfolioId: portfolio.id,
                            coins: JSON.stringify(portfolio.coin)
                        }
                    )
                }
                
            })
            return resObj;
        })
    }

    const test = () => {
        return User.findAll({
            include: {
                model: Portfolio,
                as: 'portfolio'
            }
        }).then(users => {
            // console.log(users)
            
            return users.map(user => {
                if (user && user.portfolio) {
                    // console.log(user.portfolio)
                    return Object.assign(
                        {},
                        {
                            portfolioId: user.portfolio.id,
                        }    
                    )
                } 
            })
        })
        
    }


module.exports = {
    getUsersAsset,
    getPortfolioAsset
}