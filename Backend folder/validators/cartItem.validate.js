const Joi = require("joi");
const BaseValidator = require("./base.validator");

class ValidateCartItem extends BaseValidator {
  constructor(CartItem) {}

  validateCreateCartItem = (CartItem) => {
    const schema = Joi.object().keys({
      cartId: Joi.number().required().label("cartId"),
      productId: Joi.number().required().label("productId"),
      quantity: Joi.number().required().label("quantity"),
    });
    return this.validate(schema, CartItem);
  };
}

module.exports = ValidateCartItem;
