'use strict';

const request = require('request');

module.exports.malProxy = (event, context, callback) => {
  
  const response = {
      statusCode: 200,
      headers: {
        'content-type': "application/x-www-form-urlencoded"
      }
  };

  const type = event.queryStringParameters.type;
  const suffix = {
    verify: `account/verify_credentials.xml`,
    search: `anime/search.xml`,
    add: `animelist/add/`,
    update: `animelist/update/`, 
    delete: `animelist/delete/`
  };
  
  const params = {
    url: `https://${encodeURIComponent(event.queryStringParameters.username)}:${encodeURIComponent(event.queryStringParameters.password)}@myanimelist.net/api/${suffix[type]}`
  };

  console.log(params.url);

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
