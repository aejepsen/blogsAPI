const express = require('express');

const validateJWT = require('../middleware/validateJWT');
const {
  createTokenPost,
  validateExistReqBodyLogin, 
  validateReqBodyPostUser, 
  validateReqBodyEmail, validateReqBodyPassword, validateReqBodyPostUserExist, createToken,
  getAllUsersController, getUserIdController, postCategoriesController,
  getAllCategoriesController, getAllBlogPostsController, getBlogPostIdController,
  putByIdTitleContentPostController, deleteByIdPostController,
  deleteByIdPayloadTokenController, postBlogPostController,
} = require('../controllers/controller');

const router = express.Router();

router.post('/login', 
  validateExistReqBodyLogin, 
  createToken);
router.post('/user', 
  validateReqBodyPostUser, 
  validateReqBodyEmail, 
  validateReqBodyPassword, 
  validateReqBodyPostUserExist, 
  createTokenPost);
router.get('/user', 
  validateJWT, 
  getAllUsersController);
router.get('/user/:id', validateJWT, getUserIdController);
router.post('/categories', validateJWT, postCategoriesController);
router.get('/categories', validateJWT, getAllCategoriesController);
router.post('/post', validateJWT, postBlogPostController);
router.get('/post', validateJWT, getAllBlogPostsController);
router.get('/post/:id', validateJWT, getBlogPostIdController);
router.put('/post/:id', validateJWT, putByIdTitleContentPostController);
router.delete('/post/:id', validateJWT, deleteByIdPostController);
router.delete('/user/me', validateJWT, deleteByIdPayloadTokenController);
router.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  res.json({ message: err.message });
  res.end();
});

module.exports = router;
