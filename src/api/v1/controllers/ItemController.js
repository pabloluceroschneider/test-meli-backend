var axios = require('axios');

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
		  .then( response_id => {
            axios.get(endpoint.description)
    		  .then( response_description => {
                  res.send({ ...response_id.data, ...response_description.data })
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
