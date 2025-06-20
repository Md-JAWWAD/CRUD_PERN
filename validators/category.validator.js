const Joi = require("joi");
const BaseValidator = require("./base.validator");

class ValidateCategory extends BaseValidator {
  constructor(parameters) {}

  validateCreateCategory = (category) => {
    const schema = Joi.object().keys({
      name: Joi.string().required().label("name"),
      description: Joi.string().required().label("description"),
      image: Joi.string().required().label("image"),
    });
    return this.validate(schema, category);
  };
}

module.exports = ValidateCategory;
