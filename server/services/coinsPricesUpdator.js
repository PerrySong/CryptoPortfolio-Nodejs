const redis = require('redis');
const fetch = require('node-fetch');
const symbolToName = require('../helpers/cryptoSearch/cryptocurrencies').symbolToName;

const client = redis.createClient();
const CryptoCompareURL = 'https://min-api.cryptocompare.com/data/';


const fetchJSON = (url) => {
    return fetch(url)
    .then(res => {
        if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`)
        }
        return res.json()
    })
    .then(body => {
        if (body.Response === 'Error') throw body.Message
        return body
    })
}

client.on('connect', function() {
    console.log('Redis connected');
});


const upddateCoinsPrices = () => {
    const fsyms = Object.keys(symbolToName)
    console.log(fsyms)

    const tsym = 'USD';
    fsyms.forEach(fsym => {
        fsym = fsym.trim()
        let url = `${CryptoCompareURL}price?fsym=${fsym}&tsyms=${tsym}`
        fetchJSON(url)
        .then(data => client.set(Object.keys(data)[0], data[Object.keys(data)[0]]))
        .catch(err => console.log(err))
    })
}

//test
upddateCoinsPrices()
