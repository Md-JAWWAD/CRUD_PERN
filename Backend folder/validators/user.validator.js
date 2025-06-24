const Joi = require("joi");
const BaseValidator = require("./base.validator");

class UserValidator extends BaseValidator {
  constructor(parameters) {
    super();
  }

  validateCreateUser = (user) => {
    const schema = Joi.object().keys({
      name: Joi.string().required().label("name"),
      email: Joi.string().email().required().label("email"),
      role: Joi.string().required().valid("user", "admin").label("role"),
      password: Joi.string().required().min(7).max(15).label("password"),
      isNewUser: Joi.boolean().optional().label("isNewUser"),
      isDeleted: Joi.boolean().optional(),
    });
    return this.validate(schema, user);
  };

  validateUpdateUser = (user) => {
    const schema = Joi.object().keys({
      name: Joi.string().optional().label("name"),
      email: Joi.string().optional().label("email"),
      role: Joi.string().optional().label("role"),
      password: Joi.string().optional().label("password"),
      isNewUser: Joi.boolean().optional().label("isNewUser"),
      isDeleted: Joi.boolean().optional(),
    });
     return this.validate(schema, user);
  };
}

module.exports = new UserValidator();
