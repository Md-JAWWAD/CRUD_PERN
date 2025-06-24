'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        productId: 1,
        rating: 5,
        comment: "Excellent phone, very fast!",
        createdAt: new Date('2023-01-20'),
        updatedAt: new Date()
      },
      {
        userId: 2,
        productId: 2,
        rating: 4,
        comment: "Great picture quality but speakers could be better",
        createdAt: new Date('2023-02-25'),
        updatedAt: new Date()
      },
      {
        userId: 1,
        productId: 3,
        rating: 3,
        comment: "Average quality t-shirt",
        createdAt: new Date('2023-01-18'),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('Reviews', null, {});
    
  }
};
