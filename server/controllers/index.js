'use strict'
const user = require('./user');
const profile = require('./profile');
const portfolio = require('./portfolio');
const administrator = require('./administrator');
const cryptoInfo = require('./cryptoInfo');
const recommendation = require('./recommendation')

module.exports = {
    user,
    profile,
    portfolio,
    administrator,
    cryptoInfo,
    recommendation
};