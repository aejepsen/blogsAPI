const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },{
    timestamps: false,
    tableName: 'Categories',
    undercored: true,
  });

  return Category;
};

module.exports = Category;
