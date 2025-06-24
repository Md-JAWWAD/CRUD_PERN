const { Router } = require("express");
const userRoute = require("./user.route");
const productRoute = require("./product.route");
const route = Router();

route.use("/user", userRoute);
route.use("/product", productRoute);

module.exports = route;
