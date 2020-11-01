const Joi = require('joi');

const detailSchema = Joi.object({
    author: Joi.object({
        name: Joi.string(),
        lastname: Joi.string()
    }),
    item: Joi.object({
        id: Joi.string(),
        title: Joi.string(),
        price: Joi.object({
            currency: Joi.string(),
            amount: Joi.number(),
            decimals: Joi.number()
        }),
        picture: Joi.string(),
        condition: Joi.string(),
        free_shipping: Joi.boolean(),
        sold_quantity: Joi.number(),
        description: Joi.string()  
    })
})

module.exports = {
    detailSchema
};
