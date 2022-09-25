// const jwt = require('jsonwebtoken');
const { User } = require('../database/models');

const getUserIdController = async (req, res) => {
  try {
    // const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
    // const token = jwt.sign({ data: userName }, process.env.JWT_SECRET, jwtConfig);
    // if (token) {
      const user = await User.findOne({ where: { id: req.params.id } });
      // }
      if (!user) {
        return res.status(404).json({ message: 'User does not exist' });
      }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = getUserIdController;
