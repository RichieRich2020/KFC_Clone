const express = require('express');
const { user } = require('../models/usermodel');
const jwt = require('jsonwebtoken');
const brcypt = require('bcryptjs');
const registerrouter = express.Router();

registerrouter.get('/user', async (req, res) => {
  try {
    return res.send('registerUser');
  } catch (err) {
    console.log(err);
  }
});
registerrouter.post('/register', async (req, res) => {
  try {
    let { name, email, password, gender } = req.body;

    if (!name || !email || !password || !gender) {
      return res.status(400).send({
        error: 'Incomplete data',
      });
    }

    let useRES = await user.findOne({
      email,
    });

    if (useRES) {
      return res.status(400).send({
        error: 'User with email already exists',
      });
    }

    password = brcypt.hashSync(password);

    await user.create({
      name,
      email,
      signinMethod: 'email-password', // remain
      password,
      gender,
    });

    return res.send({
      message: 'Registration successful',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: 'Something went wrong',
    });
  }
});

registerrouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body, 'sdc');
    let userp = await user.findOne({
      email,
    });

    if (!userp) {
      return res.status(400).send({
        error: 'User with email does not exist',
      });
    }

    if (!brcypt.compareSync(password, userp.password)) {
      return res.status(400).send({
        error: 'Wrong password',
      });
    }

    function generateToken(obj) {
      let token = jwt.sign(obj, 'JWT_SECRET_KEY');
      return token;
    }
    let obj = {
      email: userp.email,
      _id: userp._id,
    };

    const token = generateToken(obj);
    return res.send(token);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      error: 'Something went wrong',
    });
  }
});

module.exports = registerrouter;
