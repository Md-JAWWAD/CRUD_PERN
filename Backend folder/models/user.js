"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order, {
        foreignKey: "userId",
        as: "orders",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      User.hasMany(models.Review, {
        foreignKey: "userId",
        as: "reviews",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
      User.hasOne(models.Cart, {
        foreignKey: "userId",
        as: "cart",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, validate: { isEmail: true } },
      role: {
        type: DataTypes.STRING,
        validate: { isIn: [["user", "admin"]] },
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(15),
        validate: {
          min: 6,
          max: 15,
        },
        msg: "Password must be atleast 6 digits long.",
      },
      isNewUser: DataTypes.BOOLEAN,
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      // paranoid: true,
    }
  );
  return User;
};
