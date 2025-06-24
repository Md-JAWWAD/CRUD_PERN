'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Orders', [
      {
        total: 1039.97, // iPhone + 2 T-Shirts
        status: "delivered",
        paymentInfo: "paid",
        createdAt: new Date('2023-01-15'),
        updatedAt: new Date()
      },
      {
        total: 699.99, // Samsung TV
        status: "shipped",
        paymentInfo: "paid",
        createdAt: new Date('2023-02-20'),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
   
   await queryInterface.bulkDelete('Orders', null, {});
   
  }
};
