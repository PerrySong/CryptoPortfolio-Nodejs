const Profile = require('../models').Profile;

module.exports = {

  createOrUpdateProfile(req,res){
    console.log("create or update profile");
    const user = req.currentUser;
    if(user) {
        console.log("user = ")
        console.log(user)
      Profile.findOne({
        where: {
          userId: user.id
        }
      })
      .then(curProfile => {
          console.log(typeof(req.body.email));
        if(curProfile){
          curProfile.update({
            email: req.body.email || curProfile.email,
            github: req.body.github || curProfile.github,
            interest: req.body.interest || curProfile.interest,
            investment: req.body.investment || curProfile.investment,
            // userId: user.id //Add user id
          })
          .then((newProfile) => res.status(200).send(newProfile))
          .catch((err) => res.status(400).send({error: err}));
        } else {
          return Profile // Should not be curProfile -> Profile
          .create({
            email: req.body.email,
            github: req.body.github,
            interest: req.body.interest,
            investment: req.body.investment,
            userId: user.id
          })
          .then(newProfile => res.status(200).send(newProfile)) // Promise send cur Profile
          .catch((err) => res.status(400).send({error: err}));
        }
      })
      .catch((err) => res.status(400).send({error: err}));
    } else {
      res.status(403).send({message: 'Please log in'});
    }
  },

  createProfile(req, res) {
    console.log("create profile");
    const user = req.currentUser;
    if(user) {
      Profile.findOne({
        where: {
          userId: user.id
        }
      })
      .then(curProfile => {
        return Profile
        .create({
            email: req.body.email,
            github: req.body.github,
            interest: req.body.interest,
            investment: req.body.investment,
            userId: user.id
        })
        .then(curProfile => res.status(200).send(curProfile))
        .catch((err) => res.status(400).send({error: err}));
      })
      .catch((err) => res.status(400).send({error: err}));
    } else {
      res.status(403).send({message: 'Please log in'});
    }
  },

  getProfile(req, res) {
    console.log("get profile");
    const user = req.currentUser;
    if(user) {
        console.log(user.id)
      Profile.findOne({
        where: {
          userId: user.id
        }
      })
      .then(curProfile => res.status(200).send(curProfile)) // Should send the profile we found
      .catch((err) => res.status(400).send({error: error})) // Should have catch the error      
    } else {
      res.status(403).send({message: 'Please log in'});
    }
  },

  updateProfile(req, res) {
    console.log("update profile");
    const user = req.currentUser;
    if(user) {
      Profile.findOne({
        where: {
          userId: user.id
        }
      })
      .then(curProfile => {
        if(curProfile) {
          curProfile.update({
            email: req.body.email || curProfile.email,
            github: req.body.github || curProfile.github,
            interest: req.body.interest || curProfile.interest,
            investment: req.body.investment || curProfile.investment,
            //userId: user.id
          })
          .then(newProfile => res.status(200).send(newProfile)) //() => ->  (curProfile) =>
          .catch((err) => res.status(400).send({error: err}));
        } else {
          res.status(404).send({
            error: "You currently do not have profile."
          })  
        }
      })
      .catch((err) => res.status(400).send({error: err}));
    } else {
      res.status(403).send({message: 'Please log in'});
    }
  },

  // set each column in profile to blank, but not delete it
  // actually a modified update method
  clearProfile(req, res) {
    console.log("clear profile");
    const user = req.currentUser;
    if(user) {
      Profile.findOne({
        where: {
          userId: user.id
        }
      })
      .then(curProfile => {
        if(curProfile) {
          curProfile.update({
            email: "",
            github: "",
            interest: "",
            investment: ""
          })
          .then(curProfile => res.status(200).send(curProfile))
          .catch((err) => res.status(400).send({error: err}));
        }
      })
      .catch((err) => res.status(400).send({error: err}));
    } else {
      res.status(403).send({message: 'Please log in'});
    }
  },

  destroyProfile(req, res){
    console.log("destroy profile");
    const user = req.currentUser;
    if(user) {
      Profile.findOne({
        where: {
          userId: user.id
        }
      })
      .then(curProfile => {
        if (!curProfile) {
          return res.status(400).send({
            message: 'Profile Not Found',
          });
        } else {
            return Profile
                .destroy()
                .then(() => res.status(204).send({
                    message: "Your profile has been destroyed" // Send back the message
                }))
                .catch(error => res.status(400).send(error));
        }
      })
      .catch((err) => res.status(400).send({error: err}));
    } else {
      res.status(403).send({message: 'Please log in'});
    }
  }
}
