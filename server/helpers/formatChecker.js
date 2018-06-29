
// npm install validator
const emailValidator = require('validator'),
// npm install password-validator
    passwordValidator = require('password-validator');

//Modify the Shenyi's code: 
checkEmail = (req, res) => {
    return emailValidator.isEmail(req.body.email);
}

// username: length 6-30, no space
checkUsername = (req, res) => {
    var schema = new passwordValidator();

    schema
    .is().min(6)
    .is().max(30)
    .has().not().spaces();

    return schema.validate(req.body.username);
};

// password:length 8-20, have upper and lower case,
// have digits, no space
checkPassword = (req, res) => {
    var schema = new passwordValidator();

    schema
    .is().min(8)                                    // Minimum length 8
    .is().max(20)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits()                                 // Must have digits
    .has().not().spaces();

    return schema.validate(req.body.password);
}
module.exports = {
    //procceed only if the register information satisfied the format
    registerChecker(req, res, next) {
        const password = req.body.password;
        const username = req.body.username;
        const email = req.body.email;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        if (!password || !username || !email || !firstname || !lastname) {
            res.status(404).send({
                error: "Please fill the required blanks"
            })
        } else if (!(checkUsername(req, res))){
            res.status(404).send({
                error: "Invalid username. Username: length 6-30, no space"
            })
        } else if (!checkEmail(req, res)){   
            res.status(404).send({
                error: "Invalid email address"
            })
        } else if (!checkPassword(req, res)){    
            res.status(404).send({
                error: "Invalid password. Password:length 8-20, have upper and lower case, have digits, no space"
            })        
        } else {
            next()
        }
    },
    checkEmail,
    checkUsername, 
    checkPassword,
}