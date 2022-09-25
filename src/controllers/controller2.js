// const validateController = require('../middleware/validateController');

// const controller = {
//   async postLoginController(req, res) { 
//     try {
//       const { email, password } = req.body; 
//       validateController.validateExistValidateReqBody(req.body, res);
//       validateController.validateUserReqBodyExist(req.body, res);
//       const token = await validateController.createToken(email, password);      
//       return res.status(200).json({ token });     
//     } catch (error) {
//       if (!error.code) {
//         return res.status(500).json({ message: error.message });
//       }
//       return res.status(error.code).json({ message: error.message });
//   }
// },
// };

// module.exports = controller;
