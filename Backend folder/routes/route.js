const { Router } = require("express");
const userRoute = require("./user.route");
const productRoute = require("./product.route");
const loginRoute = require("./login.route");
const route = Router();

route.use("/signup", userRoute);
route.use("/login", loginRoute);
route.use("/user", userRoute);
route.use("/product", productRoute);

module.exports = route;
