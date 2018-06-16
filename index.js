const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');

const users = require('./test.json');

// Init App
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

app.post('/api/user', (req, res) => {

  const newUser = {
    id: uuidv1(),
    name: req.body.name,
    location: req.body.location,
    currency: req.body.currency
  };

  users.push(newUser);

  res.status(200).json(newUser);
});

app.put('/api/user/:id', (req, res) => {
  const userIndex = users.findIndex(i => i.id === req.params.id)

  users[userIndex] = req.body;

  res.status(200).json(req.body);
});

app.delete('/api/user/:id', (req, res) => {
  const userIndex = users.findIndex(i => i.id === req.params.id)

  if (userIndex > -1) {
    users.splice(userIndex, 1);
    res.status(200).send('success');
  } else {
    res.status(400).send('error');
  }
});

console.log(process.env.NODE_ENV)

const development = process.env.NODE_ENV !== 'production';

if (development) {
  app.listen(3001, () => {
    console.log('server started on port 3001');
  });
} else {
  app.use(express.static('./dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
  });

  app.listen(3000, () => {
    console.log('server started on port 3000');
  });
}
