
const { itemsSchema } = require("../models/Items");
const { detailSchema } = require("../models/ItemDetail");

class ItemsService {
    static getProducts = async data => {

        let items = []
        await data.results.slice(0,4).forEach( async element => {
            let price = JSON.stringify(element.price).split(".")
            items.push({ 
                id: element.id,
                title: element.title,
                price: {
                    currency: element.currency_id,
                    amount: parseFloat(price[0]),
                    decimals: parseFloat(price[1] ? price[1] : 0)
                },
                picture: element.thumbnail,
                condition: element.condition,
                free_shipping: element.shipping.free_shipping
            })
        })

        let product = await itemsSchema.validateAsync(
            { 
                author: {},
                categories: data.filters.find( f => f.id === "category").values.map( v => {
                    return v.name
                }),
                items: items
            }
        )
        return product;
    }
}


module.exports = ItemsService;