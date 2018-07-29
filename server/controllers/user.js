const User = require('../models').User;
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;
const uniqid = require('uniqid');
const emailVerification = require('../helpers/emailVerification');
const Portfolio = require('../models').Portfolio;
const md5 = require('md5');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
//  create
//  login
//  public
//  private
//  getSetting
//  settingUpdate
//  profile

// This is a helper method that create a new portfolio when create new account
createPortfolio = (user) => {
    console.log("create portfolio")
    return Portfolio
    .create({userId: user.id})
    .then(portfolio => {
        console.log("here")
        console.log(portfolio)
    })
    .catch((err) => {
        console.log("yoyyoyoyoy")
        res.status(400).send({error: err})
        
    });
}

createAdministratorAccountHelper = (req, res) => {
    return User
    .create({
        id: uniqid("user-"),
        email: req.body.email,
        username: req.body.username,
        password: md5(req.body.password),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        public: false,
        administrator: true
    })
    .then(user => {
        createPortfolio(user)
        const jwttoken = jwt.sign({ 
                id: user.id,
                email: req.body.email,
                username: req.body.username,
                password: md5(req.body.password),
                administrator: true

            }, secret, { expiresIn: '24h' });
        res.status(201).send({
            user: user,
            jwttoken: jwttoken
        })
    })
    .catch(err => res.status(400).send(err));    
},

createAccountHelper = (req, res) => {
        return User
        .create({
            id: uniqid("user-"),
            email: req.body.email,
            username: req.body.username,
            password: md5(req.body.password),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            public: true,
            administrator: false
        })
        .then(user => {
            createPortfolio(user)
            console.log("heheh")
            const jwttoken = jwt.sign({ 
                    id: user.id,
                    email: req.body.email,
                    username: req.body.username,
                    password: md5(req.body.password),
                    administrator: false
                }, secret, { expiresIn: '24h' });

            console.log("heheh " + user.id)
            res.status(201).send({
                user: user,
                jwttoken: jwttoken
            })
        })
        .catch(err => res.status(402).send({
            error: err
        }));    
},


loginHelper = (user, req, res) => {

    if (!user)
        return res.status(404).send({ error: 'Wrong username or email' })
    else if (user.password === md5(req.body.password)) {
        console.log("user = " + user)
        const jwttoken = jwt.sign({ 
                                id: user.id,
                                username: user.username,
                                email: user.email,
                                password: user.password,
                                administrator: user.administrator,

                             }, secret, { expiresIn: '24h' });
        console.log("user done? ")
        return res.status(200).send({
            user: user,
            jwttoken: jwttoken 
        });
    } 
    
    return res.status(404).send({ error: 'wrong password' })
}

module.exports = {

    sendVerifyEmail(req, res) {

        User.findOne({ where:{ email: req.body.email }})
        .then(user => {
            if (user) {
                res.status(400).send({
                    error: "Email address is used"
                })
                return;
            } else {
                User.findOne({ where:{ username: req.body.username }})
                .then(user => {
                    if (user) {
                        res.status(400).send({
                            error: "Username is used"
                        })
                        return;
                    } else {
                        emailVerification.sendVerifyEmail(req, res);
                        res.status(200).send({
                            success: true,
                            message: 'We sent a link to your email, please check your email and activate your account'
                        }) 
                    }
                })
            }
        })
    },

    verifyAndCreateUser(req, res) {
        
        token = req.params.jwttoken;
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(400).send({
                    error: 'Fail to verify email'
                });
            } else {
                //If the username and email is not used
                //Create  new account
                let createUser = {
                    id: decoded.id,
                    email: decoded.email,
                    username: decoded.username,
                    password: decoded.password,
                    firstname: decoded.firstname,
                    lastname: decoded.lastname,
                    public: decoded.public,
                }
                                    
                console.log(createUser);
                User
                .create(createUser)
                .then(user => {
                    if (user) {
                        createPortfolio(user)
                        createProfile(user);
                    } 
                })
                .then(res.status(200).send({
                    message: 'Your account is activated!'
                }))
                .catch(err => res.status(400).send(err));                  
            }
        })         
    },

    createAccount(req, res) {
        User.findOne({ where:{ email: req.body.email }})
        .then(user => {
            if (user) {
                res.status(400).send({
                    error: "Email address is used"
                })
                return;
            } else {
                User.findOne({ where:{ username: req.body.username }})
                .then(user => {
                    if (user) {
                        res.status(400).send({
                            error: "Username is used"
                        })
                        return;
                    } else {
                        createAccountHelper(req, res);   
                    }
                })
                .catch((err) => res.status(404).send({ error: err }))
            }
        })
        .catch((err) => res.status(404).send({ error: err }))        
    }, 
    
    createAdministratorAccount(req, res) {
        User.findOne({ where:{ email: req.body.email }})
        .then(user => {
            if (user) {
                res.status(400).send({
                    error: "Email address is used"
                })
                return;
            } else {
                User.findOne({ where:{ username: req.body.username }})
                .then(user => {
                    if (user) {
                        res.status(400).send({
                            error: "Username is used"
                        })
                        return;
                    } else {
                        createAdministratorAccountHelper(req, res);   
                    }
                })
                .catch(err => res.status(403).send({
                    error: err
                }))
            }
        }) 
        .catch(err => res.status(404).send({
            error: err
        }))       
    },  

    login(req, res) {
        if (req.body.email) {

            User.findOne({where:{ [Op.or]: [{email: req.body.email}, {username: req.body.email}]}})
            .then((user) => loginHelper(user, req, res))
            .catch(err => res.status(200).send(err)); 

        } else if (req.body.username) {
            
            User.findOne({where:{ [Op.or]: [{email: req.body.username}, {username: req.body.username}]}})
            .then((user) => loginHelper(user, req, res))
            .catch(err => res.status(200).send(err)); 
        } else {
            res.status(404).send({err: 'There is no such email or username'})
        }
    },

    public(req, res) {

        const user = req.currentUser;
        if (user) {
            User.findOne({where:{id: user.id}})
            .then(curUser => {
                if (!curUser) {
                    return res.status(404).send({
                        error: "user not found" 
                    })
                } 
                return curUser
                .update({
                    public: true
                })
                .then(res.status(200).send({
                    message: "Your status has been changed to public."
                }))
                .catch(((err) => res.status(400).send({error: err})))
            })
            .catch(((err) => res.status(400).send({error: err})))
        } else {
            res.status(400).send({
                message: "Please login"
            })
        }
    },

    private(req, res) {
        const user = req.currentUser;
        if (user) {
            User.findOne({where:{id: user.id}})
            .then(curUser => {
                if(!curUser) {
                    return res.status.send({
                        error: "user not found" 
                    })
                } 
                return curUser
                .update({
                    public: false
                })
                .then(res.status(200).send("Your status has been changed to private."))
                .catch(((err) => res.status(400).send({error: err})))
            })
            .catch(((err) => res.status(400).send({error: err})))
        } else {
            res.status(400).send({
                message: "Please login"
            })
        }
    },

    getSetting(req, res) {
        const user = req.currentUser;
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(403).send({message: 'Please log in'});
        }
    },

    updateSetting(req, res) {
        const user = req.currentUser;

        if (user) {
            return User 
            .findById(user.id)
            .then(curUser => {
                if (curUser) {
                    let newPassword;
                    if (req.body.password) {
                        newPassword = md5(req.body.password);
                    } 
                    curUser.update({
                        username: req.body.username || curUser.username,
                        email: req.body.email || curUser.email,
                        password:  newPassword || curUser.password,
                        firstname: req.body.firstname || curUser.firstname,
                        lastname: req.body.lastname || curUser.lastname,
                    })
                    .then(() => res.status(200).send(curUser))
                    .catch((err) => res.status(400).send({error: err}));
                }
            })
            .catch((err) => res.status(400).send({error: err}));
        }
    },

    list(req, res) {
        console.log("hey")
        return User
            .findAll({

            })
            .then((users) => res.status(200).send(users))
            .catch((error) =>   {
                res.status(400).send(error)
                console.log("error = " + error)
            });
    },
}