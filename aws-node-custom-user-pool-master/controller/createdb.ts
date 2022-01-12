import User from '../model/user';
import Post from '../model/post';
import PostAction from '../model/postAction';
import { getResponseHeaders } from '../util/util';
import { APIGatewayEvent, Context } from 'aws-lambda';

export const createdb = async (event, context) => {
    try {
        console.log("1")
        await User.sync({ force: true });
        console.log("2")
        await Post.sync({ force: true });
        console.log("3")
        await PostAction.sync({ force: true });
        console.log("Created")
        return {
          statusCode: 200,
          headers: getResponseHeaders(),
          body: JSON.stringify("DB created")
      }
    }
    catch (err) {
        console.log(err);
        return {
          statusCode: err.statusCode ? err.statusCode : 500,
          headers: getResponseHeaders(),
          body: JSON.stringify(err)
      }
      }
    
    }