const Sequelize = require('sequelize');
const db = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const { User, Category, BlogPost, PostCategory } = require('../database/models');

const service = {
  async postLoginService(email) {
    const user = await User.findOne({ where: { email } });
    return user;
},

async postUserService(body) {
  const { displayName, email, password, image } = body;
  const newUser = await User.create({ displayName, email, password, image });
  return newUser;
},

async getAllUsersService() {
  const allUsers = await User.findAll({ attributes: { exclude: ['password'] } });
  return allUsers;
},

async getUserIdService(id) {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  return user;
},

async postCategoriesService(name) {
  const newCategory = await Category.create({ name });
  return newCategory;
},

async getAllCategoriesService() {
  const allCategories = await Category.findAll();
  return allCategories;
},

// criar blogpost com title e contet e categories.id

async postBlogPostService(parametros) {
const { title, content, categoryIds, userId } = parametros;
const create = await sequelize.transaction(async (t) => {
  const newBlogPost = await BlogPost
  .create({ title, content, userId, published: new Date(), updated: new Date() }, 
  { transaction: t });
  const categories = categoryIds
  .map((categoryId) => ({ categoryId, postId: newBlogPost.id }));
  await PostCategory.bulkCreate(categories, { transaction: t });
  return newBlogPost;
});
return create;
},

async getAllBlogPostsService() {
  const allBlogPosts = await db.BlogPost.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      { model: User, 
        as: 'user',
        attributes: { exclude: ['createdAt', 'updatedAt', 'password'] } },
      { model: Category,
        as: 'categories',
        through: { attributes: [] },
        attributes: { exclude: ['createdAt', 'updatedAt'] } },
    ],
  });
  return allBlogPosts;
},

async  getPostByIdService(id) {
  const post = await db.BlogPost.findOne({
    where: { id },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      { model: User, 
        as: 'user',
        attributes: { exclude: ['createdAt', 'updatedAt', 'password'] } },
      { model: Category,
        as: 'categories',
        through: { attributes: [] },
        attributes: { exclude: ['createdAt', 'updatedAt'] } },
    ],
  });
  return post;
  },

async putByIdTitleContentPostService(body, id, _res, _next) {
  const { title, content } = body;
  const upDateBlogPost = await db.BlogPost.update({ title, content }, { where: { id } });
  return upDateBlogPost;
  },

async getPostByIdUserService(id, _req, _res) {
  const userPost = await db.BlogPost.findOne({ where: { id } });
  return userPost;
  },

async deleteByIdService(id, _req, _res) {
  const deletePost = await db.BlogPost.destroy({ where: { id } });
  return deletePost;
  },

async deleteByIdDecodedService(id, _req, _res) {
  const deleteUser = await db.User.destroy({ where: { id } });
  return deleteUser;
  }, 
};

module.exports = service;
