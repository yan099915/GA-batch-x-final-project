const { required } = require("joi");
const joi = require("joi");

module.exports = {
  registermid: (req, res, next) => {
    const body = req.body;

    const schema = joi.object({
      email: joi.string().required(),
      password: joi.string().required().min(5),
      name: joi.string().required(),
    });
    const validation = schema.validate(body);
    if (!validation.error) next();
    else
      res.status(400).json({
        error: validation.error.details[0].message,
      });
  },
};
