const { getValidatorErrorMessage } = require("../utils/utils.js");

class BaseValidator {
  constructor() {}

  validate = (schema, data) => {
    const result = schema.validate(data, { abortEarly: false });
    if (result.error) {
      const errorMessage = getValidatorErrorMessage(result.error);
      return {
        status: false,
        message: errorMessage,
        data: null,
      };
    }
    return {
      status: true,
      message: null,
      data: result.value,
    };
  };
}

module.exports = BaseValidator;
