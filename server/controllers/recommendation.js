const recommendation = require('../services/recommendation');

module.exports = {
    //req: number/ integer & method/ method
    recommend(req, res) {
        recommendation.recommend(req, res);
    }
}