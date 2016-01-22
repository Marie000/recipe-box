var Fetch = require('whatwg-fetch');
var baseUrl = 'http://localhost:6069';

var service = {
    get: function(url) {
        return fetch(baseUrl + url)
        .then(function(response) {
            return response.json();
        });
    },
    post: function(url, recipe){
    	return fetch(baseUrl + url, {
    		headers:{
    			'Content-Type':'application/json'
    		},
    		method: 'post',
    		body:recipe
    		}).then(function(response){
            return(response)    
    		})
    }
};

module.exports = service;