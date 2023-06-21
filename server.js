const { getUser, signInUser, registerUser, addImageStats } = require('./controllers/appControllers');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {res.send('Server response OK')})
app.get('/profile/:id', getUser);
app.post('/signin', signInUser);
app.post('/register', registerUser);
app.put('/image', addImageStats);


app.listen(process.env.PORT || 9090, () => {
  console.log(`app running on port ${PORT}`);
});