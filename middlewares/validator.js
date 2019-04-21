const Ajv = require('ajv');
const utils = require('../services/utils');
const { AppError, ErrorCode } = require('../services/appError');

class Validator {
  static build(schemas) {
    const ajv = new Ajv({ format: 'full' });
    const validator = {};

    Object.keys(schemas).forEach((key) => {
      validator[key] = (req, res, next) => {
        const payload = { ...req.params, ...req.query, ...req.body };
        const validate = ajv.compile(schemas[key]);
        const valid = validate(payload);

        if (!valid) {
          utils.error(utils.inspect(validate.errors));
          const error = new AppError(ErrorCode.General.InvalidParameters);
          return res.status(error.status).json(error);
        }

        return next();
      };
    });

    return validator;
  }
}

module.exports = Validator;
