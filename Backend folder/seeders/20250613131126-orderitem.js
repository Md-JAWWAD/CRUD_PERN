'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.bulkInsert('OrderItems', [
      { orderId: 1, productId: 1, quantity: 1, price: 999.99, createdAt: new Date('2023-01-15'), updatedAt: new Date() },
      { orderId: 1, productId: 3, quantity: 2, price: 19.99, createdAt: new Date('2023-01-15'), updatedAt: new Date() },
      { orderId: 2, productId: 2, quantity: 1, price: 699.99, createdAt: new Date('2023-02-20'), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
   
   await queryInterface.bulkDelete('OrderItems', null, {});
   
  }
};
