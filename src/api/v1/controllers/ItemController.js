var axios = require('axios');
const { detailSchema } = require("../models/ItemDetail");

class ItemControler {
	
	static find = (req, res, next) => {
		let endpoint = 'https://api.mercadolibre.com/sites/MLA/search?q=:query'.replace(':query', req.query.q);

		console.log('QUERY :: ', endpoint);
		axios
			.get(endpoint)
			.then((response) => {

				let results = response.data.results.slice(0,4)

				res.send({...response.data, results });
			})
			.catch(function(error) {
				// handle error
				console.log('ERROR :: ', error);
				res.send({
					error: true,
					message: error.message
				});
			});
	};

	static findOne = (req, res, next) => {
		let endpoint = {
			id: 'https://api.mercadolibre.com/items/:id'.replace(':id', req.params.id),
			description: 'https://api.mercadolibre.com/items/:id/description'.replace(':id', req.params.id)
		};

		console.log('QUERY :: ', endpoint.id);
		console.log('QUERY :: ', endpoint.description);

		axios.get(endpoint.id)
		  .then( ({data}) => {
            axios.get(endpoint.description)
    		  .then( async response_description => {
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
							description: response_description.data.description
						}
					}
				)
                res.send(product)
            }).catch( error => {
				res.send({
					error: true,
					message: error.message
				});
			})
		  })
		  .catch(function(error) {
            // handle error
            console.log('ERROR :: ', error);
            res.send({
                error: true,
                message: error.message
            });
        });
	};
}

module.exports = ItemControler;
