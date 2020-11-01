var axios = require('axios');
const ItemsService = require("../services/ItemsService");
const ItemService = require("../services/ItemService");

class ItemControler {
	
	static find = (req, res, next) => {
		let endpoint = 'https://api.mercadolibre.com/sites/MLA/search?q=:query'.replace(':query', req.query.q);

		console.log('QUERY :: ', endpoint);
		axios
			.get(endpoint)
			.then( async ({data}) => {
				let product = await ItemsService.getProducts(data)
				res.send(product)
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
				let product = await ItemService.getProduct( {...data, ...response_description.data} )
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
