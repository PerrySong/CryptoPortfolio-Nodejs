'use strict'
const recommendation = require('../services/recommendation');

module.exports = {
    //req: number/ integer & method/ method
    recommendUsers(req, res) {
        req.body.method = 'recommendUsers'
        req.body.number = 1
        recommendation.recommend(req, res);
    },
    recommendCoins(req, res) {
        req.body.method = 'recommendCoins'
        recommendation.recommend(req, res);
    }
}