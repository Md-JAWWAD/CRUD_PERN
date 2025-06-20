"use strict";
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "iPhone 13",
          description: "Latest Apple smartphone",
          price: 999.99,
          stock: 50,
          image: "/images/iphone13.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Samsung TV",
          description: "55-inch 4K Smart TV",
          price: 699.99,
          stock: 30,
          image: "/images/samsungtv.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Men's T-Shirt",
          description: "Cotton crew neck t-shirt",
          price: 19.99,
          stock: 100,
          image: "/images/tshirt.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Coffee Maker",
          description: "12-cup programmable coffee maker",
          price: 49.99,
          stock: 40,
          image: "/images/coffeemaker.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
