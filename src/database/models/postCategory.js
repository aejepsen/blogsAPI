const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define("PostCategory", {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BlogPosts',
        key: 'id',
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Categories',
        key: 'id',
      },
    }
  },{
    timestamps: false,
    tableName: 'PostCategories',
    undercored: true,
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: 'PostCategories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
      onDelete: 'CASCADE',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'BlogPost',
      through: 'PostCategories',  
      foreignKey: 'categoryId',
      otherKey: 'postId',
      onDelete: 'CASCADE',
    });
  }

  return PostCategory;
};

module.exports = PostCategory;
