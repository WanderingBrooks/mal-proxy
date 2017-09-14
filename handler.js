'use strict';

const request = require('request');

module.exports.malProxy = (event, context, callback) => {

  console.log(event);
  console.log(context);
  console.log(callback);

  function handleResponse(error, res,body) {
    const response = {
        statusCode: 200,
        headers: {
          'content-type': "application/x-www-form-urlencoded"
        }
    };
    console.log(error);
    console.log(body);
    response['body'] = body;
    console.log(response);
    callback(null, response);
  }

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

  if (type === 'search') {
    console.log("search");
    params.qs = {
      q: event.queryStringParameters.q
    };
    console.log(params.qs);

    request(params, handleResponse);
  }
  else if (type === 'verify') {
    console.log("verify");
    request(params, handleResponse); 
  }
  else if (type === 'add' || type === 'update' ) { 
    console.log(type);
    params.url += `${event.queryStrigParameters.id}.xml`;

    request.post(params, {form: {data: event.queryStringParameters.data}}, handleResponse);
  }
  else if (type === 'delete') { 
    console.log(type);
    params.url += `${event.queryStrigParameters.id}.xml`;

    request.post(params, handleResponse);
  }
}
