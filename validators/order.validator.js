const Joi = require("joi");
const BaseValidator = require("./base.validator");

class OrderValidator extends BaseValidator {
  constructor(parameters) {
  }

  validateCreateOrder = (order) => {
    const schema = Joi.object().keys({
        total: Joi.number().required().label("total"),
      status: Joi.string().required().label("status"),
      paymentInfo: Joi.string().required().label("paymentInfo"),
    });
     this.validate(schema, order)
  };
}

module.exports = OrderValidator