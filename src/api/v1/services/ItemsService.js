
const { itemsSchema } = require("../models/Items");
const { detailSchema } = require("../models/ItemDetail");

class ItemsService {
    static getProducts = async data => {

        let items = []
        await data.results.forEach( async element => {
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
                free_shipping: element.shipping.free_shipping,
                address: element.address.state_name
            })
        })

        let categories = data.filters.length ? data.filters.find( f => f.id === "category").values.map( v => {
            return v.name
        }) : [];

        let product = await itemsSchema.validateAsync(
            { 
                author: {
                    name: "name",
                    lastname: "lastname"
                },
                categories: categories,
                items: items
            }
        )
        return product;
    }
}


module.exports = ItemsService;