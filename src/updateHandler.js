'use strict';

const request = require('request');
const handleResponse = require('./handleResponse.js');
const qs = require('qs');

module.exports.update = (event, context, callback) => {

  console.log(event);
  console.log(context);
  console.log(callback);

  const body = qs.parse(event.body);

  const type = prefix.type;
  
  const params = {
    url: `https://${encodeURIComponent(body.username)}:${encodeURIComponent(body.password)}@myanimelist.net/api/animelist/update/${body.id}.xml`
  };

  console.log(params.url);

  request.post(params, {form: {data: body.data}}, handleResponse);
}
