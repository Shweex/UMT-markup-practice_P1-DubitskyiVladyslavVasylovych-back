const Joi = require('joi');

const bouquetCreateSchema = Joi.object({
  title: Joi.string().trim().min(1).max(255).required(),
  description: Joi.string().trim().min(1).required(),
  price: Joi.number().positive().precision(2).required(),
  favorite: Joi.boolean().optional(),
}).required();

module.exports = bouquetCreateSchema;
