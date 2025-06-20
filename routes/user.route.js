const { Router } = require("express");
const userController = require('../controllers/user.controller');
const route = Router()

route.get('/get-all-user', userController.getAllUsers)
route.post('/create-user', userController.createUser)
route.put('/update-user/:id', userController.updateUser)
route.delete('/delete-user/:id', userController.deleteUser)

module.exports = route;