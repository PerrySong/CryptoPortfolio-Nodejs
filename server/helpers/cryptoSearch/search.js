const TrieSearch = require('trie-search'),
      cryptocurrencies = require('./cryptocurrencies')
      

      
module.exports = {
    
    searchNames(name) {
        return new Promise((resolve, reject) => {
            const ts = new TrieSearch();
            ts.addFromObject(cryptocurrencies.nameToSymbol);
            let itemsArray = ts.get(name);
            
            const namesArray = itemsArray.map(item => {
                return item._key_;
            })
            if(namesArray) {
                resolve(namesArray);
            } else {
                return reject("Can not find the names.")
            }
        })
    },

    searchSymbols(symbol) {
        return new Promise((resolve, reject) => {
            const ts = new TrieSearch();
            ts.addFromObject(cryptocurrencies.symbolToName);
            let itemsArray = ts.get(symbol);
            
            const symbolsArray = itemsArray.map(item => {
                return item._key_;
            })
            if(symbolsArray) {
                resolve(symbolsArray);
            } else {
                return reject("Can not find the symbols.")
            }
        })
    },

    namesToSymbols(name) {
        return new Promise((resolve, reject) => {
            const ts = new TrieSearch();
            ts.addFromObject(cryptocurrencies.nameToSymbol);
            
            let itemsArray = ts.get(name);
            const symbolsArray = itemsArray.map(item => {
                return item.value;
            })
            if(symbolsArray) {
                resolve(symbolsArray);
            } else {
                return reject("Can not find the symbols.")
            }
        })
    },

    symbolsToNames(symbol) {
        return new Promise((resolve, reject) => {
            const ts = new TrieSearch();
            ts.addFromObject(cryptocurrencies.symbolToName);
            let itemsArray = ts.get(symbol);
            
            const namesArray = itemsArray.map(item => {
                return item.value;
            })
            if (namesArray) {
                resolve(namesArray);
            } else {
                return reject("Can not find the names.")
            }
        })
    },

}