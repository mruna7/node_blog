'use strict';

const dynamodb = require('./utils/dynamodb');

module.exports.listPosts = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
  };

  // fetch all posts from the database
  dynamodb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the post item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
	  headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT"
        },
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};