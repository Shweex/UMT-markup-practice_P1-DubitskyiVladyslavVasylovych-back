const Joi = require('joi');

const bouquetFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
}).required();

module.exports = bouquetFavoriteSchema;
