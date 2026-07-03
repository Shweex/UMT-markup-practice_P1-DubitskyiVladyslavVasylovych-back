const Joi = require('joi');

const bouquetUpdateSchema = Joi.object({
  title: Joi.string().trim().min(1).max(255),
  description: Joi.string().trim().min(1),
  price: Joi.number().positive().precision(2),
  favorite: Joi.boolean(),
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided for update',
  });

module.exports = bouquetUpdateSchema;
