const db = require("../models/index");
const BaseRepo = require("./base.repo");

class ProductRepo extends BaseRepo {
  constructor() {
    super(db.Product);
    this.model = db.Product;
  }

  async findProduct(condition) {
    return this.findOne({ condition });
  }

  async getProducts(condition = {}) {
    return this.findAll(condition);
  }

  async createProduct(data) {
    return this.create(data);
  }

  async updateProduct(data, id) {
    return this.update(data, { id });
  }

  async deleteProduct(condition, type = "soft") {
    return this.delete(condition, type);
  }

  async isProductExist(id) {
    return this.count({ id });
  }
}

module.exports = new ProductRepo();
