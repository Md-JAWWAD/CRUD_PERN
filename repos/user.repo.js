const db = require("../models/index");
const BaseRepo = require("./base.repo");

class UserRepo extends BaseRepo {
  constructor() {
    super(db.User);
    this.model = db.User;
  }

  async findUser(condition) {
    return this.findOne({condition})
  }
  
  async getUsers(condition = {}) {
    return this.findAll(condition)
  }

  async createUser(data) {
    return this.create(data);
  }

  async updateUser(data, id) {
    return this.update(data, { id });
  }

  async deleteUser(condition, type = "soft") {
    return this.delete(condition, type);
  }

  async countUser(condition = {}) {
    return this.count(condition);
  }

  async isUserExist(id) {
    return this.count({ id });
  }
}

module.exports = new UserRepo();
