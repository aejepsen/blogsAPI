const jwt = require('jsonwebtoken');

const { User } = require('../database/models');

const errosToken = [
  {
    status: 401,
    message: 'Token not found',
  },
  {
    status: 401,
    message: 'Expired or invalid token',
  },
];

const validateJWT = async (req, res, next) => {
const token = req.headers.authorization;
if (!token) {
  return next(errosToken[0]);
}
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ where: { 
    email: decoded.data.email, password: decoded.data.password } });
  req.decoded = decoded;  
  req.user = user;
} catch (error) {
  return next(errosToken[1]);
}
next();
};

module.exports = validateJWT;
