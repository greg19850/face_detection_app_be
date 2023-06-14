const {addUser, fetchUser, fetchImage, getRegisteredUser} = require("../models/appModels");


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
  const {email, password} = req.body;
  if(!email || !password){
    return res.status(400).json('incorrect form data')
  }
  getRegisteredUser(email, password).then(data => {
    res.status(200).json(data[0]);
  })
  .catch(err =>{
    res.status(400).json('Login details incorrect')
  })
};

exports.registerUser = (req, res, next) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password){
    return res.status(400).json('incorrect form data')
  }
  addUser(name, email, password).then(user => {
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