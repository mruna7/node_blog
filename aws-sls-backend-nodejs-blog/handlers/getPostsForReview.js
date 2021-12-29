'use strict';

const dynamodb = require('./utils/dynamodb');

module.exports.getPostsForReview = (event, context, callback) => {

  const params = {
    "TableName": process.env.DYNAMODB_TABLE,
    "IndexName": "IsVerifiedIndex",
    "KeyConditionExpression": "isVerified = :value",
    "ExpressionAttributeValues": {
        ":value": "false"
    }
  };
  // fetch all posts from the database
  dynamodb.query(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the post items for review.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });

};