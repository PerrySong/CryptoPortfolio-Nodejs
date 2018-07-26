'use strict'
const TrieSearch = require('trie-search'),
      cryptocurrencies = require('./cryptocurrencies')
      

      
module.exports = {
    searchNames(name) {
        
        const ts = new TrieSearch();
        ts.addFromObject(cryptocurrencies.nameToSymbol);
        let itemsArray = ts.get(name);
        
        const namesArray = itemsArray.map(item => {
            return item._key_;
        })
        
        return namesArray;
    },

    searchSymbols(symbol) {
        const ts = new TrieSearch();
        ts.addFromObject(cryptocurrencies.symbolToName);
        let itemsArray = ts.get(symbol);
        
        const symbolsArray = itemsArray.map(item => {
            return item._key_;
        })
        return symbolsArray;
    },

    namesToSymbols(name) {
        const ts = new TrieSearch();
        ts.addFromObject(cryptocurrencies.nameToSymbol);
        
        let itemsArray = ts.get(name);
        const symbolsArray = itemsArray.map(item => {
            return item.value;
        })
        
        return symbolsArray;
    },

    symbolsToNames(symbol) {
        const ts = new TrieSearch();
        ts.addFromObject(cryptocurrencies.symbolToName);
        let itemsArray = ts.get(symbol);
        
        const namesArray = itemsArray.map(item => {
            return item.value;
        })
        
        return namesArray;
    },

}