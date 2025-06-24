'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Categories', [
      {
        name: "Electronics",
        description: "Latest gadgets and devices",
        image: "/images/electronics.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Clothing",
        description: "Fashion for all seasons",
        image: "/images/clothing.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Home & Kitchen",
        description: "Everything for your home",
        image: "/images/home.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('Categories', null, {});
    
  }
};
