import User from '../model/user';
import Post from '../model/post';
import { Sequelize } from "sequelize";
import { getResponseHeaders } from '../util/util';
import { APIGatewayEvent, Context } from 'aws-lambda';
import PostAction from '../model/postAction';
import { sequelize } from '../model/index';

export async function getAllPost(event: APIGatewayEvent, context: Context): Promise<any> {
    
    try {
            let post=await Post.findAll({
                include: [{
                    model: User,
                  },
                  {
                     model: PostAction,
                     
                     attributes: [[Sequelize.fn('COUNT', 'postId'), 'PostCount']],
                     where: {
                        actionType: "like"
                     },
                     required: false
                  //   where: {
                  //     school: "Woodstock Music School"
                  //   },
                  //   required: false
                  }
                ],
                group: [ 'id' ],
                  
            });
            if (!post) {
                return {
                    statusCode: 404,
                    headers: getResponseHeaders(),
                    error: JSON.stringify({ message: "Not found" })
                };
            }
            return {
                statusCode: 200,
                headers: getResponseHeaders(),
                body: JSON.stringify(post)
            };
        }
        catch (err ) {
            console.log(err);
            return {
                statusCode: err.statusCode ? err.statusCode : 500,
                error: err.message ? err.message : "Not found",
            };
        }
    }