'use strict';

const request = require('request');
const handleResponse = require('./handleResponse.js');

module.exports.verifyCredentials = (event, context, callback) => {

  console.log(event);
  console.log(context);
  console.log(callback);
  
  const params = {
    url: `https://${encodeURIComponent(prefix.username)}:${encodeURIComponent(prefix.password)}@myanimelist.net/api/account/verify_credentials.xml`
  };

  console.log(params.url);

  request(params, handleResponse);

}
