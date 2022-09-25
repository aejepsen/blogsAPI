const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const Category = require('../database/models/category');

const getAllPostsController = async (body, req, res) => {
  try {
    const { displayName } = body;
    const userName = await User.findOne({ displayName });
    const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
    const token = jwt.sign({ data: userName }, process.env.JWT_SECRET, jwtConfig);
    if (token) {
    const users = await Category.findAll();
    return res.status(200).json(users);
    }
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
  };

module.exports = getAllPostsController;
