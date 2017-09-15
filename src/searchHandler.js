'use strict';

const request = require('request');
const handleResponse = require('./handleResponse.js');

module.exports.search = (event, context, callback) => {

  console.log(event);
  console.log(context);
  console.log(callback);
  
  const params = {
    url: `https://${encodeURIComponent(prefix.username)}:${encodeURIComponent(prefix.password)}@myanimelist.net/api/anime/search.xml`
  };

  console.log(params.url);

  params.qs = {
    q: event.queryStringParameters.q
  };
  console.log(params.qs);

  request(params, handleResponse);
}
