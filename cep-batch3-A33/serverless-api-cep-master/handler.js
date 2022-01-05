const db = require('./db_connect');
var TOPICARN = 'arn:aws:sns:us-east-1:280869158808:blog-created';
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var sns = new AWS.SNS({apiVersion: '2010-03-31'});
const fetch = require('node-fetch');

module.exports.verifyAdminUser = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    console.log("event is", event)
    db.getById('users', event.request.userAttributes.email)
    .then(res => {
    	console.log("response is ", res)
    	if (res) {
        	callback(null,event)
        } else {
        	var error = new Error("Email is not in admin user list. Contact system administrator")
       		 callback(error, e.statusCode)
        }
    })
    .catch(e => {
	    console.log("error is ", e)
    	var error = new Error("Problem in verifying user. Contact system administrator")
        callback(error, null)
    })
};



module.exports.addUserToDB = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(event)
   const user =  {
                'id': event.request.userAttributes.sub,
                'username': event.userName,
                'name': event.request.userAttributes.name,
                'lastname': event.request.userAttributes.family_name,
                'email': event.request.userAttributes.email,
            }

  db.updateById('users', event.request.userAttributes.email, user)
    .then(res => {
      console.log("res in add user db", res)
      callback(null, event)
    })
    .catch(e => {
      console.log("error is ", e)
      var error = new Error("Cannot add this user details to the system ")
      callback(error, e.statusCode)
    }) 
};

 
// module.exports.getAllArticles = async (event, context, callback) => {
//   const params = {
//     Message: 'A new blog has been added.',
//     Subject: 'Blog added',
//     TopicArn: TOPICARN
//     //TopicArn: 'arn:aws:sns:us-east-1:250234221219:blog-created'
//   };
//   // Send to SQS
//   console.log("Started SNS", sns)
//   const status = await sns.publish(params).promise();
//   console.log("sns:" + sns);
//   console.log("status:" + status);
//   console.log("params:" + params);
//   const response = {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: 'Go Serverless v1.0! Your function executed successfully!',
//       status: status,
//     }),
//   };
// 
//   callback(null, response);
// 
// };

module.exports.getAllArticles = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    console.log("event is", event)
    console.log("context is", context)    
        console.log("Raja", db)
         
    db.getAll('articles')
        .then(res => {
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(res),
                headers:{ 'Access-Control-Allow-Origin' : '*' }
            })
        })
        .catch(e => {
            console.log(e);
            callback(null, {
                statusCode: e.statusCode || 500,
                body: 'Error: Could not find articles: ' + e,
                headers:{ 'Access-Control-Allow-Origin' : '*' }
            })
        })
};

module.exports.createArticles = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = JSON.parse(event.body);
  db.insert('articles', data)
    .then(res => {
      callback(null,{
        statusCode: 200,
            body: '{"id": "' + res + '"}'
      })
    })
    .catch(e => {
      callback(null,{
        statusCode: e.statusCode || 500,
        body: "Could not create articles " + e
      })
    }) 
    

};

module.exports.deleteArticle = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

    db.deleteById('articles', event.pathParameters.id)
    .then(res => {
        callback(null,{
            statusCode: 200,
            body: '{"id": "' + res + '"}'
        })
    })
    .catch(e => {
        callback(null,{
            statusCode: e.statusCode || 500,
            body: "Could not delete articles " + e
        })
    })

}

module.exports.updateArticle = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
	
const params = {
    Message: 'Blog has been updated',
    Subject: 'Blog Updated',
    TopicArn: TOPICARN
    //TopicArn: 'arn:aws:sns:us-east-1:250234221219:blog-created'
  };
  // Send to SQS
  console.log("Started SNS", sns)
  const snsConst = sns.publish(params).promise();
  snsConst.then(
  function(data) {
    console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
    console.log("MessageID is " + data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });  
  console.log("sns:" + snsConst);
	
  const data = JSON.parse(event.body);
  db.updateById('articles', event.pathParameters.id, data)
  .then(res => {
      callback(null,{
          statusCode: 200,
            body: '{"id": "' + res + '"}'
      })
  })
  .catch(e => {
      callback(null,{
          statusCode: e.statusCode || 500,
          body: "Could not update articles " + e
      })
  })
  
 //   const params = {
//  Message: 'A new blog has been added.',
//  Subject: 'Blog added',
//  TopicArn: TOPICARN
//  //TopicArn: 'arn:aws:sns:us-east-1:250234221219:blog-created'
//  };
//  // Send to SQS
//  var snsVar = sns.publish(params).promise()
//  snsVar.then(
//   function(data) {
//     console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
//     console.log("MessageID is " + data.MessageId);
//   }).catch(
//     function(err) {
//     console.error(err, err.stack);
//   });;  
//  console.log("SNS console", snsVar)
}

module.exports.getArticle = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    db.getById('articles', event.pathParameters.id)
    .then(res => {
        callback(null,{
            statusCode: 200,
            body: JSON.stringify(res)
        })
    })
    .catch(e => {
        callback(null,{
            statusCode: e.statusCode || 500,
            body: "Could not find articles: " + e
        })
    })
};