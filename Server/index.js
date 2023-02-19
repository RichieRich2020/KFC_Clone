const express = require('express');
const cors = require('cors');
const app = express();
const user = require('./models/usermodel');
const MenuData = require('./models/postDataModel');
const postrouter = require('./router/PostRouter');
const registerrouter = require('./router/RiegsterRouter');
// const loginrouter = require('./router/loginrouter');
const connectdatabase = require('./config/connectdb');
app.use(express.json());
app.use(cors());

app.use('/menu', postrouter);
app.use('/users', registerrouter);
// app.use('/login', loginrouter);
app.get('/', (req, res) => {
  res.send('hello welcome to kfc');
});

app.listen(process.env.port, (req, res) => {
  connectdatabase();
  console.log('connected at ' + process.env.port);
});
