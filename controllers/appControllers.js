const {addUser, fetchUser} = require("../models/appModels")

const database = {
  users: [
    {
      id: "0",
      name: 'Greg',
      email: 'greg123@gmail.com',
      password: 'password',
      entries: 0,
      joined: new Date()
    },
    {
      id: "1",
      name: 'Pati',
      email: 'patis@gmail.com',
      password: 'password123',
      entries: 0,
      joined: new Date()
    }
  ]
};

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
  console.log(id);
  let found = false;

  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.status(200).json(user);
    }
  });

  if (!found) {
    return res.status(404).json('user not found');
  };
};