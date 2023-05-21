const { getUser, signInUser, registerUser, addImageStats } = require('./controllers/userControllers');

const express = require('express');

const app = express();
app.use(express.json());

// app.get('/', (req, res) => {
//   res.status(200).send('working');
// });

app.get('/profile/:id', getUser);
app.post('/signin', signInUser);
app.post('/register', registerUser);
app.post('/image', addImageStats);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});