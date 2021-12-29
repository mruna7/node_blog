const uuid = require('uuid');
const dynamodb = require('./utils/dynamodb');

module.exports.createPost = (event, context, callback) => {
    /*if (!event.requestContext.authorizer) {
      errorResponse('Authorization not configured', context.awsRequestId, callback);
      return;
    }

    const rideId = toUrlString(randomBytes(16));*/
    console.log('Received event (): ', event);

    // Because we're using a Cognito User Pools authorizer, all of the claims
    // included in the authentication token are provided in the request context.
    // This includes the username as well as other attributes.
    //const username = event.requestContext.authorizer.claims['cognito:username'];

    // The body field of the event in a proxy integration is a raw string.
    // In order to extract meaningful values, we need to first parse this string
    // into an object. A more robust implementation might inspect the Content-Type
    // header first and use a different parsing strategy based on that value.
    const postItem = event.body;

    if (!postItem.emailAddress) {
      errorResponse('Email address is required.', context.awsRequestId, callback);
    }
    if (!postItem.isVerified) {
      postItem.isVerified = "false";
    }
    if (!postItem.viewsCount) {
      postItem.viewsCount = 0;
    }
    if (!postItem.likeCount) {
      postItem.likeCount = 0;
    }
    if (!postItem.createdDate) {
      postItem.createdDate = (new Date()).toISOString();
    }

    putPost(uuid.v1(), postItem.emailAddress, postItem.isVerified, 
        postItem.summary, postItem.content, postItem.createdDate, postItem.userName, postItem.imageUrl, postItem.viewsCount, postItem.likeCount).then(() => {
        // You can use the callback function to provide a return value from your Node.js
        // Lambda functions. The first parameter is used for failed invocations. The
        // second parameter specifies the result data of the invocation.

        // Because this Lambda function is called by an API Gateway proxy integration
        // the result object must use the following structure.
        callback(null, {
            statusCode: 201,
            body: "{status: true, message: \"created successfully\"}",
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        });
    }).catch((err) => {
        console.error("Error found: " + err);

        // If there is an error during processing, catch it and return
        // from the Lambda function successfully. Specify a 500 HTTP status
        // code and provide an error message in the body. This will provide a
        // more meaningful error response to the end client.
        errorResponse(err.message, context.awsRequestId, callback)
    });
};

function putPost(postId, emailAddress, isVerified, summary, content, createdDate, userName, imageUrl, viewsCount, likeCount) {
    console.log("inserting data in table..");
    return dynamodb.put({
        TableName: 'posts',
        Item: {
            postId: postId, 
            emailAddress: emailAddress,
            isVerified: isVerified,
            summary: summary,
            content: content,
            createdDate: createdDate,
            userName: userName,
            imageUrl: imageUrl,
            viewsCount: viewsCount,
            likeCount: likeCount
        }
    }).promise();
}

function errorResponse(errorMessage, awsRequestId, callback) {
  callback(null, {
    statusCode: 500,
    body: JSON.stringify({
      Error: errorMessage,
      Reference: awsRequestId,
    }),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
}