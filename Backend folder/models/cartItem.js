"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartItem.belongsTo(models.Cart, { as: "carts", foreignKey: "cartId" });
      CartItem.belongsTo(models.Product, {
        as: "products",
        foreignKey: "productId",
      });
    }
  }
  CartItem.init(
    {
      cartId: DataTypes.NUMBER,
      productId: DataTypes.NUMBER,
      quantity: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "CartItem",
    }
  );
  return CartItem;
};
