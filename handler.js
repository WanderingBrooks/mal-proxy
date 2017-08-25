'use strict';

const request = require('request');

module.exports.malProxy = (event, context, callback) => {
  
  const response = {
      statusCode: 200
  };

  const type = event.queryStringParameters.type;
  const suffix = {
    verify: `myanimelist.net/api/account/verify_credentials.xml`,
    add: `https://myanimelist.net/api/animelist/add/`,
    update: `https://myanimelist.net/api/animelist/update/`, 
    delete: `https://myanimelist.net/api/animelist/delete/`
  };
  
  const params = {
    url: `https://${encodeURIComponent(event.queryStringParameters.username)}:${encodeURIComponent(event.queryStringParameters.password)}@${suffix[type]}`
  };

  if (type != 'verify') { 
    params.url += `${event.queryStringParameters.id}.xml`

    request.post(params, {form: {data: event.queryStringParameters.data}}, function (error, response, body) {
      console.log(error);
      console.log(response);
      console.log(body);
    });
  } 
  else {
    request(params, function (error, res, body) {
    console.log(error);
    console.log(body);
    response['body'] = body;
    console.log(response);
    callback(null, response);
  });
  }
};
