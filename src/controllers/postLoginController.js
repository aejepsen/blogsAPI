const jwt = require('jsonwebtoken');

const { User } = require('../database/models');

const validateBody = (body, res) => {
  const { email, password } = body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  return true;
};

const postLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validateBody(req.body, res)) return;

    const user = await User.findOne({ where: { email } });
  
    if (!user || user.password !== password) {      
      return res.status(400).json({ message: 'Invalid fields' });
    }

    const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

    const token = jwt.sign({ data: user }, process.env.JWT_SECRET, jwtConfig);

    return res.status(200).json({ token });
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Erro interno', error: err.message });
  }
};

module.exports = postLoginController;
