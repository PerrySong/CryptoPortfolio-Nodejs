
const usersController = require('../controllers').user,
      jwtCheck = require('../middleware/authorization').jwtCheck,
      isAdmin = require('../middleware/authorization').isAdmin,
      reqBodyContainSymbol = require('../middleware/reqBodyContainSymbol'),
      profileController = require('../controllers').profile,
      portfolioController =require('../controllers').portfolio,
      formatChecker = require('../helpers/formatChecker'),
      administratorController = require('../controllers').administrator,
      cryptoInfoController = require('../controllers').cryptoInfo,
    //   recommendationController = require('../controllers').recommendation,
      subscribeController = require('../controllers').subscribe

    

module.exports = (app) => {
    console.log(reqBodyContainSymbol)
    app.get('/', (req, res) => res.status(200).send({
        message: 'Welcome to the UserAuth API!'
    }));

    //Use middleware
    app.use('/user', jwtCheck);
    app.use('/administrator', jwtCheck);
    app.use('/register', formatChecker.registerChecker);
    app.use('/verify/register', formatChecker.registerChecker);
    app.use('/adminregister', formatChecker.registerChecker);
    app.use('/administrator', isAdmin);
    
    //Users' routes:
    app.post('/register', usersController.createAccount);
    app.post('/login', usersController.login);

    app.get('/user/public', usersController.public);
    app.get('/user/private', usersController.private);

    //Get the user's setting 
    app.get('/user/setting', usersController.getSetting);
    //Update the user'setting
    app.put('/user/setting', usersController.updateSetting);

    //Users' profile route:
    app.post('/user/profile', profileController.createOrUpdateProfile);
    app.get('/user/profile', profileController.getProfile);
    app.put('/user/profile', profileController.updateProfile);
    app.get('/user/profile/clear', profileController.clearProfile);
    app.delete('/user/profile', profileController.destroyProfile);

    //Users' friends route:
    app.post('/user/profile/friends',profileController.addFriends);
    app.get('/user/profile/friends',profileController.listFriends);
    app.post('/user/profile/friends/search',profileController.searchFriends);
    app.post('/user/profile/friends/searchname',profileController.searchFriendsName);
    app.delete('/user/profile/friends/delete',profileController.deleteFriends);
    app.post('/user/profile/friends/portfolio',profileController.getFriendPortfolio);

    //Email verify register routes
    app.post('/verify/register', usersController.sendVerifyEmail);
    app.get('/verify/:jwttoken', usersController.verifyAndCreateUser);

    //Administrator register route
    app.post('/adminregister', usersController.createAdministratorAccount);
    app.get('/administrator/list', usersController.list)
    //Administrator manully send email notifications to every user.
    app.post('/administrator/sendall', administratorController.sendEmail)
    

    //Portfolio routes
    app.get('/user/asset', portfolioController.currentAsset);
    app.post('/user/make-transaction', portfolioController.createTransaction);
    app.get('/user/transactions', portfolioController.transactionHistory);
    app.post('/user/others/assets', portfolioController.getAUserAsset);

    //Coins infomations routes:
    app.get('/user/coinlist', cryptoInfoController.coinList);
    app.get('/user/exchange-list', cryptoInfoController.exchangeList);
    app.post('/user/price', cryptoInfoController.price);
    app.post('/user/price-multi', cryptoInfoController.priceMulti);
    app.post('/user/price-historical', cryptoInfoController.priceHistorical);

    //Recommendation:
    // req: number/Integer method/String
    // app.post('/user/recommend/coins', recommendationController.recommendCoins);
    // app.post('/user/recommend/users', recommendationController.recommendUsers);
    // req: number/Integer method/String
    // app.post('/user/recommend/coins', recommendationController.recommendCoins);
    // app.post('/user/recommend/users', recommendationController.recommendUsers);

    //Route for subscribe
    app.post('/user/subscribe', reqBodyContainSymbol.check, subscribeController.subscribe);
    app.post('/user/unsubscribe', reqBodyContainSymbol.check, subscribeController.unSubscribe);

    //It is a route for test
    app.get('/list', usersController.list);

}