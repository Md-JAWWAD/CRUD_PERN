class BaseRepo {
  model;
  constructor(model) {
    this.model = model;
  }

  async findOne(condition) {
    return this.model.findOne({ where: condition });
  }

  async findAll(condition = {}) {
    return this.model.findAll(condition);
  }

  // async findOneWithInclude(searchQuery) {
  //   return this.model.findOne(searchQuery);
  // }

  async create(data) {
    return this.model.create(data);
  }

  async update(data, id) {
    return this.model.update(data, { where: id});
  }

  async count(condition) {
    return this.model.count({ where: condition });
  }

  async softDelete(id) {
    return this.model.update({ isDeleted: true }, { where: {id} });
  }

  async delete(id, type) {
    if (type == "soft") {
      return this.softDelete(id);
    }
    if (type == "hard") {
      return this.model.destroy({where: {id}} /* {id,force: true} */);
    }
  }
}

module.exports = BaseRepo;
