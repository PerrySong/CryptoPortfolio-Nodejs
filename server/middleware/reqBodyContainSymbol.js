const cs = require('../helpers/cryptoSearch/search')
check = (req, res, next) => {
    
    if (req.body.symbol) {
        console.log(cs.searchSymbols)
        cs.searchSymbols(req.body.symbol)
        .then(symbol => {
            if (symbol) next();
        })
        .catch(err => res.status(400).send({ error: err }))
    } else {
        res.status(400).send({ error: 'Please provide req.body.symbol' })
    }
}
module.exports = {
    check
}