"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.hasOne(models.CartItem, { as: "cartItems", foreignKey: "cartId" });
      Cart.belongsToMany(models.Product, {
        as: "products",
        foreignKey: "cartId",
        through: models.CartItem,
      });
    }
  }
  Cart.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
