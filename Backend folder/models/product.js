"use strict";
const { Model, BOOLEAN } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**a
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Review, {
        as: "reviews",
        foreignKey: "productId",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      Product.belongsTo(models.Category, {
        as: "category",
        foreignKey: "categoryId",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      Product.belongsToMany(models.Cart, {
        through: models.CartItem,
        as: "carts",
        foreignKey: "productId",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }
  Product.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true },
      price: {
        type: DataTypes.INTEGER,
        validate: { isDecimal: true },
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        validate: { isInt: true },
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        msg: "Image should be .PNG, .JPEG etc",
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Category",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
      // paranoid: true,
    }
  );
  return Product;
};
