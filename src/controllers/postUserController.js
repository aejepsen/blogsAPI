// const jwt = require('jsonwebtoken');
// const { User } = require('../database/models');

// const validateBodyUser = async (body, res) => {
//   const { displayName, email, password } = body;
//   if (!email || !password || !displayName) {
//     return res.status(400).json({ message: 'Some required fields are missing' });
//     }

//   return true;
// };

// const validateExistUser = async (body, res) => {
//   const { displayName, password, email } = body;
//   console.log(displayName);
//   const userName = await User.findOne({ where: { email } });
//   console.log(userName);
//   if (userName !== null) {
//     return res.status(409).json({ message: 'User already registered' });
//     } 
//   if (password.length < 6) {
//     return res.status(400)
//     .json({ message: '"password" length must be at least 6 characters long' });
//   }
//   if (displayName.length < 8) {
//     return res.status(400)
//     .json({ message: '"displayName" length must be at least 8 characters long' });
//     } 
//   return true;
// };

// const validateEmail = async (body, res) => {
//   const { email } = body;
//   if (!email.includes('@')) {
//     return res.status(400).json({ message: '"email" must be a valid email' });
//     }
//   return true;
// };

// const postUserController = async (req, res) => {
//   try {
//     const { displayName, email, password, image } = req.body;
//     if (validateBodyUser(req.body, res) === true) return;
//     if (await validateExistUser(req.body, res) === true) return;
//     if (validateEmail(req.body, res) === true) return;
//     console.log(await validateExistUser(req.body, res), validateEmail(req.body, res), validateEmail(req.body, res));
//     const user = await User.create({ displayName, email, password, image });
//     console.log(user);
//     const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

//     const token = jwt.sign({ data: user }, process.env.JWT_SECRET, jwtConfig);
//     return res.status(201).json({ token });
//   } catch (err) {
//     return res.status(500).json({ message: 'Erro interno', error: err.message });
//   }
//   };

//   module.exports = postUserController;
