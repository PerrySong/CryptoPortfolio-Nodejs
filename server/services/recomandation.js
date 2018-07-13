const User = require('../models').User,
      Portfolio = require('../models').Portfolio,
      Coin = require('../models').Coin;
   

const nameToCoin = () => {

    User.findAll()
    .then(function(users) {
        var userToCoin = new Object;
        if (users) {
            users.map(function(user) {
                if(user) {
                    
                }
                Portfolio.findOne({where:{userId: user.id}})
                .then(portfolio => {
                    if(portfolio) {
                        promise1 = Coin.findAll({where:{portfolioId: portfolio.id}})
                        .then(coins => {

                            const coinList = coins.map(coin => {
                                return {[coin.type]: coin.amount}
                            })
                            return coinList;
                        })
                        console.log(promise1)
                        .then(coinList => {
                            userToCoin[user.username] = coinList
                        })
                        .catch(err => reject(err))     
                    }
                })
                .catch(err => console.log(err))  
                
            })
            
        }
        console.log("hahahaahahaahhaahahhahahah")
        return userToCoin;
    })
    .then(u => {
        console.log(u);
        console.log('ressssssssssasdasdsadasdasdasdasdasdasdasdasdasdasdasdasssssss');
        return u
    })
    .catch(err => reject(err))            
}


nameToCoin();
// getUserToCoins();
console.log("hahahahahaha")

module.exports = {

}
