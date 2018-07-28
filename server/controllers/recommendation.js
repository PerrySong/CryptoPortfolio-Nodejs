const recommendation = require('../services/recommendation');

module.exports = {
    //req: number/ integer & method/ method
    // recommendUsers(req, res) {
    //     req.body.method = 'recommendUsers'
    //     req.body.number = 1
    //     recommendation.recommend(req, res);
    // },
    recommendCoins(req, res) {
        req.body.method = 'recommendCoins'
        recommendation.recommendCoins(req, res);
    },
    // recommendPortfolio(req, res) {
    //     req.body.method = 'recommendPortfolio'
    //     recommendation.recommend(req, res);
    // }
}