"use strict";
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
     {
        name: "John",
        email: "John@gmail.com",
        role: "user",
        password: 123,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jawad",
        email: "Jawad@gmail.com",
        role: "user",
        password: 123,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kashif",
        email: "Kashif@gmail.com",
        role: "user",
        password: 123,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Farhan",
        email: "Farhan@gmail.com",
        role: "user",
        password: 123,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Rahim",
        email: "Rahim@gmail.com",
        role: "user",
        password: 123,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Memon",
        email: "Memon@gmail.com",
        role: "admin",
        password: 123,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Zakir",
        email: "Zakir@gmail.com",
        role: "user",
        password: 123,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Saqib",
        email: "Saqib@gmail.com",
        role: "user",
        password: 123,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ali",
        email: "Ali@gmail.com",
        role: "user",
        password: 123,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Saad",
        email: "Saad@gmail.com",
        role: "admin",
        password: 123,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
