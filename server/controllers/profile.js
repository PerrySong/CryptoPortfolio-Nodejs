const Profile = require('../models').Profile;

module.exports = {

  createOrUpdateProfile(req,res){
    console.log("create or update profile");
    const user = req.currentUser;
    if (user) {
        console.log("user = ")
        console.log(user)
      Profile.findOne({
        where: {
          userId: user.id
        }
      })
      .then(curProfile => {
        console.log("email = ")
          console.log(typeof(req.body.email));
        if (curProfile){
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
    if (user) {
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
    if (user) {
      Profile.findOne({
        where: {
          userId: user.id
        }
      })
      .then(curProfile => {
        if (curProfile)
          res.status(200).send(curProfile)
        else
          res.status(404).send({
            error: "You do not have profile yet"
          })  
      }) // Should send the profile we found
      .catch((err) => res.status(400).send({error: error})) // Should have catch the error      
    } else {
      res.status(403).send({message: 'Please log in'});
    }
  },

  updateProfile(req, res) {
    console.log("update profile");
    const user = req.currentUser;
    if (user) {
      Profile.findOne({
        where: {
          userId: user.id
        }
      })
      .then(curProfile => {
        if (curProfile) {
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
    if (user) {
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
      .catch((err) => res.status(402).send({error: err}));
    } else {
      res.status(403).send({message: 'Please log in'});
    }
  },

  destroyProfile(req, res){
    console.log("destroy profile");
    const user = req.currentUser;
    if (user) {
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
  },

  // new friend is userid and treated as a string
  addFriends(req,res){
    console.log("Add New Friends");
    const user = req.currentUser;
    if (user) {
      Profile.findOne({
        where: {
          userId: user.id
        }
      })
      .then(curProfile => {
        console.log("then");
        if (!curProfile) {
          return res.status(400).send({
            message: 'Profile Not Found',
          });
        } else {
          console.log("get curProfile");
          if(curProfile.friends !== null){
            console.log("Add to array");
            if (curProfile.friends.indexOf(req.body.userId) !== -1){
              res.status(403).send({message: 'Friends already added'});
              } else {
                  curProfile.friends.push(req.body.userId);
                  curProfile.update({
                    friends: curProfile.friends
                  })
                  .then(newProfile => res.status(200).send(newProfile))
                  .catch((err) => res.status(400).send({error: err}));
              }

          } else {
            console.log("create new array");
            var newArray = [req.body.userId];
            curProfile.update({
              friends: newArray
            })
            .then(newProfile => res.status(200).send(newProfile))
            .catch((err) => res.status(400).send({error: err}));
          }
        }
      })
      .catch((err) => res.status(400).send({error: err}));
    } else {
      res.status(403).send({message: 'Please log in'});
    }
  },

  // friend is userid and treated as a string.
  // this method will return userid. it is useless now since we are
  // putting user id in
  // indexOf() return -1 if can't find object
  searchFriends(req,res){
    console.log("Search Friends");
    const user = req.currentUser;
    if (user) {
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
          var index = curProfile.friends.indexOf(req.body.userId);
          console.log('Friend Id: ');
          console.log(req.body.userId);

          console.log('index: ');
          console.log(index);
          if(!curProfile.friends || index === -1){
              return res.status(400).send({
                message: 'Friend Not Found',
              });
          } else {
            res.status(200).send(curProfile.friends[index]);
          }
        }
      })
      .catch((err) => res.status(400).send({error: err}));
    } else {
      res.status(403).send({message: 'Please log in'});
    }
  },

  listFriends(req,res){
    console.log("List All Friends");
    const user = req.currentUser;
    if (user) {
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
          // simple version, just return an array
          // res.status(200).send(curProfile.friends);
          // improved version, return array of json,
          // which contains id and username
          var friendList = curProfile.friends;
          var names = [];
          friendList.forEach(function(item,index){
              searchUser(item, names);
              console.log("hey, names");
              console.log(names);
          });
          setTimeout(function(){
              res.status(200).send(names);
          },100)
        }
      })
      .catch((err) => res.status(400).send({error: err}));
    } else {
      res.status(403).send({message: 'Please log in'});
    }
  },

  deleteFriends(req,res){
    console.log("Delete Friend");
    const user = req.currentUser;
    if (user) {
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
          var index = curProfile.friends.indexOf(req.body.userId);
          if(!curProfile.friends || index === -1){
              return res.status(400).send({
                message: 'Friend Not Found',
              });
          } else {
            curProfile.friends.splice(index, 1);
            console.log('Friend deleted');
            curProfile.update({
              friends: curProfile.friends
            })
            .then(newProfile => res.status(200).send(newProfile))
            .catch((err) => res.status(400).send({error: err}));
          }
        }
      })
      .catch((err) => res.status(400).send({error: err}));
    } else {
      res.status(403).send({message: 'Please log in'});
    }
  },

  getFriendPortfolio(req,res){
    console.log("Get Friend's Portfolio");
    const user = req.currentUser;
    if (user) {
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
          var index = curProfile.friends.indexOf(req.body.userId);
          if(!curProfile.friends || index === -1){
              console.log('id:');
              console.log(req.body.userId);
              return res.status(400).send({
                message: 'Friend Not Found',
              });
          } else {
            Portfolio.findOne({
                where: {
                    userId: curProfile.friends[index]
                }
            })
            .then(portfolio => {
                if(!portfolio){
                    res.status(404).send({error:'can not find this user'})
                }
                return Coin.findAll({where: {portfolioId: portfolio.id}})
                .then(coins => res.status(200).send(coins))
                .catch(err => res.status(400).send({
                    error: err,
                }))
            })
            .catch(err => res.status(400).send(err));
          }
        }
      })
      .catch((err) => res.status(400).send({error: err}));
    } else {
      res.status(403).send({message: 'Please log in'});
    }
  }
}
