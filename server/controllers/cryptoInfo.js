
const cc = require('../services/cryptoCompare');

module.exports = {
    coinList(req, res) {
        cc.coinList()
        .then(coinList => {
            res.status(200).send(coinList);
        })
        .catch(error => res.status(404).send({error: error}))
    },

    exchangeList(req, res) {
        cc.exchangeList()
        .then(exchangeList => {
            res.status(200).send(exchangeList);
        })
        .catch(error => res.status(404).send({error: error}));
    },

    price(req, res) {
        cc.price(req.body.fsym, req.body.tsyms, req.body.options)
        .then(prices => {
            res.status(200).send(prices)
        })
        .catch(error => res.status(200).send({error: error}));
    },

    priceMulti(req, res) {
        cc.price(req.body.fsym, req.body.tsyms, req.body.options)
        .then(prices => {
            res.status(200).send(prices)
        })
        .catch(error => res.status(200).send({error: error}));
    },

    priceHistorical(req, res) {
        cc.priceHistorical(req.body.fsym, req.body.tsyms, req.body.time)
        .then(prices => {
            res.status(200).send(prices)
        })
        .catch(error => res.status(200).send({error: error}));
    }

}