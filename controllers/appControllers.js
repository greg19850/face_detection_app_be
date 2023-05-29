const {addUser, fetchUser, fetchImage} = require("../models/appModels")

exports.getUser = (req, res, next) => {
  const { id } = req.params;
 
  fetchUser(id).then(user =>{

    if(user.length){
      res.status(200).json(user[0])
    } else(
      res.status(404).json('user not found')
    )
  }).catch(err =>{
    res.status(404).json('error getting user')
  })
};

exports.signInUser = (req, res, next) => {
  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.status(200).json(database.users[0]);
  } else {
    res.status(400).json('invalid login details');
  }
};

exports.registerUser = (req, res, next) => {
  const { name, email, password } = req.body;

  addUser(name, email).then(user => {
    res.status(200).json(user[0]);
  }).catch((err) => {
    res.status(400).json('Unable to register')
  });
};

exports.addImageStats = (req, res, next) => {
  const { id } = req.body;
  fetchImage(id).then(data => {
    res.status(200).json(data[0]);
  })
  .catch(err =>{
    res.status(400).json('Unable to get entries');
  })
  
};