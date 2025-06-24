const Joi = require("joi");
const BaseValidator = require("./base.validator");

class ProductValidator extends BaseValidator {
  constructor(parameters) {super()}

  validateCreateProduct = (product) => {
    const schema = Joi.object().keys({
      name: Joi.string().required().label("name"),
      description: Joi.string().optional().label("description"),
      price: Joi.number().required().label("price"),
      stock: Joi.number().required().label("stock"),
      image: Joi.string().required().label("image"),
      isDeleted: Joi.boolean().optional(),
      categoryId: Joi.number().optional().label("categoryId")
    });

   return this.validate(schema, product);
  };

  validateUpdateProduct = (product) => {
    const schema = Joi.object().keys({
      name: Joi.string().optional().label("name"),
      description: Joi.string().optional().label("description"),
      price: Joi.number().optional().label("price"),
      stock: Joi.number().optional().label("stock"),
      image: Joi.string().optional().label("image"),
      isDeleted: Joi.boolean().optional().label("isDeleted"),
      categoryId: Joi.number().optional().label("categoryId")
    });
  return this.validate(schema, product);
  };
}

module.exports = new ProductValidator();
