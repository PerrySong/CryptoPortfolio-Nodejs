const cc = require('../services/cryptoCompare');

module.exports = {
    coinList(req, res) {
        cc.coinList()
        .then(coinList => {
            res.status(200).send(coinList);
        })
        .catch(error => res.status(200).send({error: error}))
    },

    exchangeList(req, res) {
        cc.exchangeList()
        .then(exchangeList => {
            res.status(200).send(exchangeList);
        })
        .catch(error => res.status(200).send({error: error}));
    }

}