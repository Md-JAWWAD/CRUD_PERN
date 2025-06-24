'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.bulkInsert('CartItems', [
      { cartId: 1, productId: 1, quantity: 1, createdAt: new Date(), updatedAt: new Date() },
      { cartId: 1, productId: 3, quantity: 2, createdAt: new Date(), updatedAt: new Date() },
      { cartId: 2, productId: 2, quantity: 1, createdAt: new Date(), updatedAt: new Date() },
      { cartId: 3, productId: 4, quantity: 1, createdAt: new Date(), updatedAt: new Date() },
      { cartId: 4, productId: 1, quantity: 1, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
 
    await queryInterface.bulkDelete('CartItems', null, {});
  
  }
};
