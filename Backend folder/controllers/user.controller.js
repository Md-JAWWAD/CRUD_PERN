const { Op } = require("sequelize");
const db = require("../models/index.js");
const UserRepo = require("../repos/user.repo.js");
const {
  validateCreateUser,
  validateUpdateUser,
} = require("../validators/user.validator.js");
const BaseController = require("./base.controller.js");

class UserController extends BaseController {
  constructor() {
    super();
  }

  getUserById = async (req, res) => {
    const { id } = req?.params;
    const user = await UserRepo.findUser(id);

    if (!user) {
      return this.errorResponse(res, "User ID not found", 404);
    }

    return this.successResponse(res, user, "User retrieved successfully");
  };

  getAllUsers = async (req, res) => {
    const {
      sortBy = "id",
      sortOrder = "DESC",
      page = 1,
      limit = 5,
      search = "",
      filter = "",
    } = req?.query;

    const skip = (page - 1) * limit;

    let searchConditions = {
      isDeleted: false,
    };

    if (search) {
      searchConditions[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { role: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (filter) {
      searchConditions.role = filter;
    }

    const options = {
      where: searchConditions,
      limit: parseInt(limit),
      order: [[sortBy, sortOrder]],
      offset: skip,
    };
    const users = await UserRepo.getUsers(options);
    const countAllUsers = await UserRepo.countUser(searchConditions);
    return this.successResponse(
      res,
      { users, countAllUsers },
      "Users retrieved successfully"
    );
  };

  createUser = async (req, res) => {
    const validationResult = validateCreateUser(req.body);

    console.log("userr: ", validationResult);

    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }

    try {
      const user = await UserRepo.createUser(req.body);
      return this.successResponse(res, user, "User created successfully");
    } catch (e) {
      // console.log(e)
      // throw new Error("Error creating user");
      return this.errorResponse(res, "Error creating user", 400, e);
    }
  };

  updateUser = async (req, res) => {
    const { id } = req.params;
    const validationResult = validateUpdateUser(req.body);
    if (!validationResult.status) {
      return this.validationErrorResponse(res, validationResult.message);
    }
    const isUser = await UserRepo.isUserExist(id);
    if (!isUser) {
      return this.errorResponse(res, "User ID not found", 404); // not user id , only user and change status code
    }
    const user = await UserRepo.updateUser(req.body, id);
    return this.successResponse(res, user, "User updated successfully");
  };

  deleteUser = async (req, res) => {
    let { id } = req?.params;
    let { type } = req?.query;

    const isUser = await UserRepo.isUserExist(id);

    if (!isUser) {
      return this.errorResponse(res, "User ID not found", 404);
    }
    // type = type ? type : "soft";
    const user = await UserRepo.deleteUser(id, type);
    return this.successResponse(
      res,
      user,
      `User with ID ${id} deleted successfully`
    );
  };
}

module.exports = new UserController();
