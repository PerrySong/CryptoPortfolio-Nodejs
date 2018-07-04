const usersController = require('../controllers').users,
      jwtCheck = require('../middleware/authorization').jwtCheck,
      isAdmin = require('../middleware/authorization').isAdmin,
      profileController = require('../controllers').profile,
      portfolioController =require('../controllers').portfolio,
      formatChecker = require('../helpers/formatChecker'),
      administratorController = require('../controllers').administrator;

    

module.exports = (app) => {
    app.get('/', (req, res) => res.status(200).send({
        message: 'Welcome to the UserAuth AP1!'
    }));

    //Use middleware
    app.use('/user', jwtCheck);
    app.use('/administrator', jwtCheck);
    app.use('/register', formatChecker.registerChecker);
    app.use('/verify/register', formatChecker.registerChecker);
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

    //Email verify register routes
    app.post('/verify/register', usersController.sendVerifyEmail);
    app.get('/verify/:jwttoken', usersController.verifyAndCreateUser);

    //Administrator register route
    app.post('/adminregister', usersController.createAdministratorAccount);
    app.get('/administrator/list', usersController.list)
    //Administrator manully send email notifications to every user.
    app.post('/administrator/sendEmail', administratorController.sendEmail)

    app.get('/list', usersController.list);

    //Portfolio routes
    app.get('/user/asset', portfolioController.currentAsset);

}