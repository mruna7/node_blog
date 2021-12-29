'use strict';

const dynamodb = require('./utils/dynamodb');

module.exports.likePost = (event, context, callback) => {

  var updateParams = {
    TableName:process.env.DYNAMODB_TABLE,
    Key:{
      "postId": event.pathParameters.id
    },
    UpdateExpression: "set likeCount = likeCount + :r",
    ExpressionAttributeValues:{
        ":r": 1
    }
  };
  console.log("Incrementing like for post - " + event.pathParameters.id);
  
  dynamodb.update(updateParams, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t like the post.',
      });
      return;
    }

    // create a response
    callback(null, {
      statusCode: 200,
      body: "{status: true, message: \"Post like successful\"}",
      headers: {
          'Access-Control-Allow-Origin': '*',
      },
    });
  });

};
