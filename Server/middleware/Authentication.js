const jwt = require('jsonwebtoken');
const { user } = require('../models/usermodel');

function authenticate(req, res, next) {
  let authorization = req.headers.authorization;

  let token = authorization && authorization.split(' ').pop();

  jwt.verify(token, 'JWT_SECRET_KEY', async (err, userr) => {
    if (err) {
      // return res.redirect('/')
      return res.send({
        err: err.message,
      });
    } else {
      let existingUser = await user.findOne({ _id: userr._id });
      if (!existingUser) {
        return res.send({
          message: 'User not found',
        });
      }
      // data = {
      //   user_id: userr._id,
      //   ...data,
      // };
      req.userinfo = userr;

      next();
    }
  });
}

module.exports = authenticate;
