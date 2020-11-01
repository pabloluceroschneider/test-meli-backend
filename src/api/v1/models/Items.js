const Joi = require('joi');
const detailSchema = require('./ItemDetail');

const itemsSchema = Joi.object({
    author: Joi.object({
        name: Joi.string(),
        lastname: Joi.string()
    }),
    categories: Joi.array().items(Joi.string()),
    items: Joi.array().items( detailSchema )
})

module.exports = itemsSchema;
