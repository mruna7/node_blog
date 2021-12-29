'use strict';

const dynamodb = require('./utils/dynamodb');

module.exports.approvePost = (event, context, callback) => {
 var updateParams = {
    TableName:process.env.DYNAMODB_TABLE,
    Key:{
      "postId": event.path.id
    },
    UpdateExpression: "set isVerified = :r",
    ExpressionAttributeValues:{
        ":r": "true"
    }
  };
  console.log("Approving post for id - " + event.path.id);

  dynamodb.update(updateParams, (error, result) => {
        // handle potential errors
        if (error) {
          console.error(error);
          callback(null, {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t approve the post.',
          });
          return;
        }
    
        // create a response
        callback(null, {
          statusCode: 200,
          body: "{status: true, message: \"Approved successfully\"}",
          headers: {
              'Access-Control-Allow-Origin': '*',
          },
      });
  });

};