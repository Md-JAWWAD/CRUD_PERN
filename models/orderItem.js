"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderItem.belongsTo(models.Product, {
        as: "products",
        foreignKey: "productId",
      });
      OrderItem.belongsTo(models.Order, {
        as: "orders",
        foreignKey: "orderId",
      });
    }
  }
  OrderItem.init(
    {
      orderId: DataTypes.NUMBER,
      productId: DataTypes.NUMBER,
      quantity: DataTypes.NUMBER,
      price: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "OrderItem",
    }
  );
  return OrderItem;
};
