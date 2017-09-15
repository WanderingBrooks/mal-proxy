module.exports.handleResponse = (error, res,body) => {
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
};