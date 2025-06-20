const Joi = require("joi");
const BaseValidator = require("./base.validator");

class ValidateCart extends BaseValidator {
  constructor(Cart) {}

  validateCreateCart = (Cart) => {
    const schema = Joi.object().keys({
      userId: Joi.number().required().label("userId")
    });
    return this.validate(schema, Cart);
  };
}

module.exports = ValidateCart;
