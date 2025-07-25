"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Product, {
        as: "products",
        foreignKey: "productId",
      });
      Review.belongsTo(models.User, { as: "users", foreignKey: "userId" });
    }
  }
  Review.init(
    {
      userId: DataTypes.NUMBER,
      productId: DataTypes.NUMBER,
      rating: DataTypes.NUMBER,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
