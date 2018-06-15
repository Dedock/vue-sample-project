const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const users = require('./test.json');

// Init App
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/users', (req, res) => {
  res.status(200).json(users);
});

app.post('/api/user/:id', (req, res) => {
  console.log(req.params.id)
  const userIndex = users.findIndex(i => i.id === req.params.id)
  console.log(userIndex)
  users[userIndex] = {}
  res.status(200).json(req.body);
});

console.log(process.env.NODE_ENV)

const development = process.env.NODE_ENV !== 'production';

if (development) {
  app.listen(3001, () => {
    console.log('server started on port 3001');
  });
} else {
  app.use(express.static('./build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'));
  });

  app.listen(3000, () => {
    console.log('server started on port 3000');
  });
}
