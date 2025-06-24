const Joi = require("joi");
const BaseValidator = require("./base.validator");

class ProductValidator extends BaseValidator {
  constructor(parameters) {}

  validateCreateProduct = (product) => {
    const schema = Joi.object().keys({
      userId: Joi.number().required().label("userId"),
      productId: Joi.number().required().label("productId"),
      rating: Joi.number().required().label("rating"),
      comment: Joi.string().optional().label("comment"),
    });
    this.validate(schema, product);
  };
}

module.exports = ProductValidator;
