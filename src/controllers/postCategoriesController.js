// {
//   "name": "Typescript"
// }

//  post/categories

const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const postCategoriesController = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || name.length === 0) {
      return res.status(404).json({ message: '"name" is required' });
    }
    const user = await User.findOne({ where: { email } });
    const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
    jwt.sign({ data: user }, process.env.JWT_SECRET, jwtConfig);
    const category = await User.create({ name });
    return res.status(201).json({ category });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = postCategoriesController;
