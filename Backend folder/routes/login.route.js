const loginController = require('../controllers/login.controller');
const { Router } = require("express");
const route = Router();

route.post("/user-login", loginController.loginUser)

module.exports = route