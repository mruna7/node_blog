'use strict';

const dynamodb = require('./utils/dynamodb');

module.exports.getPost = (event, context, callback) => {

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key:{
        "postId": event.pathParameters.id
    }
  };
  console.log("fetching for id - " + event.pathParameters.id);
  // fetch all posts from the database
  dynamodb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
    }
    console.log("GET query result - " + JSON.stringify(result));
  
    if (result && result.Item) {
      incrementViews(result, callback);
    } else {
      callback(null, {
        statusCode: 400,
        headers: { 'Content-Type': 'text/plain' },
        body: 'No record found',
      });
    }
  });

};

function incrementViews (postItemResult, callback) {
  var id = postItemResult.Item.postId;
  var viewsCount = parseInt(postItemResult.Item.viewsCount);
  viewsCount++;
  postItemResult.Item.viewsCount = viewsCount;

  console.log("id: " + id + ", viewsCount: " + viewsCount);
  // update views
  var updateParams = {
    TableName:process.env.DYNAMODB_TABLE,
    Key:{
      "postId": id
    },
    UpdateExpression: "set viewsCount = :r",
    ExpressionAttributeValues:{
        ":r": viewsCount
    }
  };

  dynamodb.update(updateParams, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t increase view count for the post item.',
      });
      return;
    }

    // create a success response
    const response = {
      statusCode: 200,
      body: JSON.stringify(postItemResult.Item),
    };
    callback(null, response);
  });

}