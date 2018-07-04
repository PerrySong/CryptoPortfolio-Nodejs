const   jwt = require('jsonwebtoken'), 
        secret = require( '../config').secret,
        User = require('../models').User;

//This function as a middleware verify the token in request's header, and check the current user's information.
//If a the request pass the test, we execute the next.

const jwtCheck = (req, res, next) => {
    
    if(req.header && req.headers.authorization) {
        const token = req.headers.authorization;
        
        //Verify the whole token!!
        jwt.verify(token, secret, (err, decoded) => {
            
            if(err) {
                res.redirect('/');
            } else {
                User.findOne({where:{id: decoded.id}})
                .then(user => {
                    if(!user || user.email != decoded.email || user.username != decoded.username || user.password != decoded.password) {
                        res.status(401).json({ error: 'Fail to authorize '});
                    } else {
                        req.currentUser = user;
                        next();
                    }
                })
            }
        })
    } else {
        res.status(401).json({err: 'Fail to authorize'});
    }
    
},

//This function verify if the current login user is administrator.
//If it is, call next()
isAdmin = (req, res, next) => {
    if(req.currentUser.administrator) {
        next();
    } else {
        res.status(400).send({
            error: 'You are not administrator'
        })
    }
}


module.exports = { 
    jwtCheck,
    isAdmin
}
