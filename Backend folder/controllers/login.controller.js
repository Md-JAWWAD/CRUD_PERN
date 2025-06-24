const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRepo = require("../repos/user.repo");
require("dotenv").config();
const BaseController = require("./base.controller");

class LoginController extends BaseController {
  constructor(parameters) {
    super();
  }

  loginUser = async (req, res) => {
    const { email, password, role } = req.body;
    // const token = req.user;
    // console.log("TOKEN", req);
    const savedUserData = await userRepo.findUser(email);
    console.log("savedUserData", savedUserData);
    // jwt(password , savedUserData.password)
    const isPasswordTrue = bcrypt.compare(password, savedUserData.password);
    isPasswordTrue
      ? console.log("Credentials Correct")
      : console.log("Credentials not Correct");
    //    this.successResponse(res, isPasswordTrue, "Credentials are Correct")
    // const userVerification = jwt.verify(token, process.env.SECRET_KEY);
    const newToken = jwt.sign(
      { email: savedUserData.email },
      process.env.SECRET_KEY
    );
    this.successResponse(
      res,
      newToken,
      "Credentials are Correct, Login Success"
    );
  };
}

module.exports = new LoginController();
