
const { detailSchema } = require("../models/ItemDetail");

class ItemsService {
    static getProduct = async data => {
        console.log(data)
        let price = JSON.stringify(data.price).split(".")
        let product = await detailSchema.validateAsync(
            { 
                author: {},
                item: {
                    id: data.id,
                    title: data.title,
                    price: {
                        currency: data.currency_id,
                        amount: parseFloat(price[0]),
                        decimals: parseFloat(price[1])
                    },
                    picture: data.pictures[0].url,
                    condition: data.condition,
                    free_shipping: data.shipping.free_shipping,
                    sold_quantity: data.sold_quantity,
                    description: data.plain_text
                }
            }
        )
        return product;
    }
}


module.exports = ItemsService;