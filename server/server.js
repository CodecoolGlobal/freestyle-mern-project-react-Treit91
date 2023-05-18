const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express();
const jwt = require('jsonwebtoken');
app.listen(3001);

mongoose.connect('mongodb+srv://treit91:S4e12ipFD5hG18qa@cluster0.zjzcwnl.mongodb.net/test');

app.use(express.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
  next();
});

app.post('/api/register', async (req, res) => {
  const usernameFound = await User.findOne({ username: req.body.username });
  const emailFound = await User.findOne({ email: req.body.email });
  if (usernameFound) {
    res.json('username exists').status(200);
  } else if (emailFound) {
    res.json('email exists').status(200);
  } else {
    try {
      User.create({
        name: {
          first: req.body.firstName,
          last: req.body.lastName,
        },
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        registeredAt: Date.now(),
      });
      res.json('ok').status(201);
    } catch (error) {
      console.error(error.message);
      res.sendStatus(500);
    }
  }
});

app.post('/api/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (user) {
    user.checkPassword(req.body.password, (err, result) => {
      if (err) return next(err);
      if (!result) {
        res.status(500).json('Wrong password').end;
      } else {
        let token;
        try {
          token = jwt.sign({ username: user.username }, 'secretkeyappearshere', {
            expiresIn: '1h',
          });
        } catch (err) {
          console.log(err);
          const error = new Error('Error! Something went wrong.');
          return next(error);
        }

        res.status(200).json({
          success: true,
          data: {
            username: user.username,
            token: token,
          },
        });
      }
    });
  } else {
    res.status(200).json({ success: false });
  }
});

app.get('/api/profile', async (req, res) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    try{
        const decodedToken = jwt.verify(token, 'secretkeyappearshere');
        const user = await User.findOne({ username: decodedToken.username });
        res.status(200).json({ success: true, data: { username: decodedToken.username }, user: { user } });
    } catch (err) {
        res.status(200).json({
            success: false,
            message: `Error: Wrong token.`,
          });
    }
  } else {
    res.status(200).json({
      success: false,
      message: `Error: Token was not provided.`,
    });
  }
});

app.patch('/user/:username', (req, res) => {
  User.findOneAndUpdate(
    { username: req.params.username },
    { username: req.body.username, password: req.body.password },
    { new: true },
  )
    .then((result) => res.status(200).json(result))
    .catch((error) => console.error(error));
});
