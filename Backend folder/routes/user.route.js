const { Router } = require("express");
const userController = require("../controllers/user.controller");
const userVerify = require("../middlewares/user.auth.middleware");
const route = Router();

route.get("/get-all-user", userVerify, userController.getAllUsers);
route.post("/create-user", userVerify, userController.createUser);
route.put("/update-user/:id", userVerify, userController.updateUser);
route.delete("/delete-user/:id", userVerify, userController.deleteUser);

module.exports = route;
