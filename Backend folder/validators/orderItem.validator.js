const Joi = require("joi");
const BaseValidator = require("./base.validator");

class ValidateOrderItem extends BaseValidator {
  constructor(OrderItem) {}

  validateCreateOrderItem = (OrderItem) => {
    const schema = Joi.object().keys({
      orderId: Joi.number().required().label("orderId"),
      productId: Joi.number().required().label("productId"),
      quantity: Joi.number().required().label("quantity"),
      price: Joi.number().required().label("price")
    });
    return this.validate(schema, OrderItem);
  };
}

module.exports = ValidateOrderItem;
