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

exports.getUser = (req, res, err) => {
  const { id } = req.params;
  let found = false;

  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.status(200).json(user);
    }
  });

  if (!found) {
    return res.status(404).json('user not found');
  };
};

exports.signInUser = (req, res, err) => {
  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.status(200).json('signed in');
  } else {
    res.status(400).json('invalid login detailss');
  }
};

exports.registerUser = (req, res, err) => {
  const { name, email, password } = req.body;
  database.users.push({
    id: database.users.length,
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  });

  res.status(200).json(database.users[database.users.length - 1]);
};

exports.addImageStats = (req, res, err) => {
  const { id } = req.body;
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