const jwt = require('jsonwebtoken');
// const { Category } = require('../database/models');
const service = require('../services/service');

const errosController = [
  { status: 400, message: 'Some required fields are missing' },
  { status: 400, message: 'Invalid fields' },
  { status: 400, message: '"displayName" length must be at least 8 characters long' },
  { status: 400, message: '"email" must be a valid email' },
  { status: 400, message: '"password" length must be at least 6 characters long' },
  { status: 409, message: 'User already registered' },
  { status: 404, message: 'User does not exist' },
  { status: 400, message: '"name" is required' },
  { status: 404, message: 'User does not exist' },
  { status: 404, message: 'Post does not exist' },
  { status: 401, message: 'Unauthorized user' },
  { status: 400, message: 'Some required fields are missing' },
  { status: 404, message: 'Post does not exist' },
  { status: 400, message: '"categoryIds" not found' },
];
const validateExistReqBodyLogin = async (req, res, next) => {
    const { email, password } = req.body; if (password.length === 0 || email.length === 0) {
      console.log(password.length, email.length); next(errosController[0]);
    }
    const user = await service.postLoginService(email);
    if (user === null) { return next(errosController[1]); } next();
  };
const createToken = async (req, res, _next) => {
  const { email } = req.body; const user = await service.postLoginService(email);
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };  
  const token = jwt.sign({ data: user }, process.env.JWT_SECRET, jwtConfig);
  return res.status(200).json({ token });
  };
const validateReqBodyPostUser = async (req, _res, next) => {
    const { displayName } = req.body;
    if (displayName.length < 8) { return next(errosController[2]); } next();
  };
const validateReqBodyEmail = async (req, _res, next) => {
  const { email } = req.body; if (!email.includes('@')) { return next(errosController[3]); } next();
};
const validateReqBodyPassword = async (req, res, next) => { 
  const { password } = req.body; 
  if (password.length < 6) { return next(errosController[4]); } next();
};
const validateReqBodyPostUserExist = async (req, res, next) => {
  const { email } = req.body; const user = await service.postLoginService(email);
  if (user !== null) { return next(errosController[5]); }
  await service.postUserService(req.body); next();
};
const createTokenPost = async (req, res, _next) => {
  const { email } = req.body; const user = await service.postLoginService(email);
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };  
  const token = jwt.sign({ data: user }, process.env.JWT_SECRET, jwtConfig);
  return res.status(201).json({ token });
  };
const getAllUsersController = async (_req, res) => {
  const users = await service.getAllUsersService(); return res.status(200).json(users);
  };
const getUserIdController = async (req, res, next) => {
  const { id } = req.params; const user = await service.getUserIdService(id);
  if (!user) { return next(errosController[8]); } return res.status(200).json(user);
  };
 const postCategoriesController = async (req, res, next) => {
    const { name } = req.body; 
    if (!name) { 
    return next(errosController[7]);
    } const newCategory = await service.postCategoriesService(name);
    return res.status(201).json(newCategory);
  };

const getAllCategoriesController = async (_req, res) => {
  const categories = await service.getAllCategoriesService();
  return res.status(200).json(categories);
};

// criar blogpost com title e contet e catgegories.id

const postBlogPostController = async (req, res, next) => {
  const { title, content, categoryIds } = req.body; 
  const parametros = { 
    title, 
    content, 
    categoryIds,
    userId: req.user.id,
  };
  const allCategories = await service.getAllCategoriesService();
  const allCategoriesIds = allCategories.map((category) => category.id);
  const categoryIdsExist = categoryIds.every((categoryId) => allCategoriesIds.includes(categoryId));
  if (!categoryIdsExist) { return next(errosController[13]); }
  if (!title || !content || !categoryIds) { return next(errosController[0]); }
  const newBlogPost = await service.postBlogPostService(parametros, next);
  return res.status(201).json(newBlogPost);
};

const getAllBlogPostsController = async (_req, res) => {
  const blogPosts = await service.getAllBlogPostsService();
  return res.status(200).json(blogPosts);
  };

const getBlogPostIdController = async (req, res, next) => {
  const { id } = req.params; const blogPost = await service.getPostByIdService(id);
  if (!blogPost) {
    return next(errosController[9]);
  } return res.status(200).json(blogPost);
  };

const putByIdTitleContentPostController = async (req, res, next) => {
  const { id } = req.params; 
  const userPost = await service.getPostByIdUserService(id);
  // console.log(userPost);
  // console.log(id);
  // console.log(userPost.id, Number(req.user.id));
  if (userPost.id !== req.user.id) { return next(errosController[10]); }
  await service.putByIdTitleContentPostService(req.body, id);
  const newUserPost = await service.getPostByIdService(id);
  if (!newUserPost.title || !newUserPost.content) {
    return next(errosController[11]);
  } return res.status(200).json(newUserPost);
};

const deleteByIdPostController = async (req, res, next) => {
  const { id } = req.params;
  const userPost = await service.getPostByIdService(id);
  if (!userPost) { 
    return next(errosController[12]); 
  }
  if (userPost.userId !== req.user.id) { 
    return next(errosController[10]); 
  }
  await service.deleteByIdService(id);
  return res.status(204).json();
  };

  const deleteByIdPayloadTokenController = async (req, res, _next) => {
    console.log(req.decoded.data.id);
    await service.deleteByIdDecodedService(req.decoded.data.id);
    return res.status(204).json();
  };

module.exports = {
  postBlogPostController,
  deleteByIdPayloadTokenController,
  deleteByIdPostController,
  putByIdTitleContentPostController,
  getBlogPostIdController,
  getAllBlogPostsController,
  getAllCategoriesController,
  validateExistReqBodyLogin,
  createToken,
  getAllUsersController,
  validateReqBodyPostUser,
  validateReqBodyEmail,
  validateReqBodyPassword,
  validateReqBodyPostUserExist,
  getUserIdController,
  postCategoriesController,
  createTokenPost,
};
