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
                    attributes: [[Sequelize.fn('COUNT', 'postId'), 'likeCount']],
                    where: {
                       actionType: "like"
                    },
                    required: false
                 },
                 {
                   model: PostAction,
                   attributes: [[Sequelize.fn('COUNT', 'postId'), 'dislikeCount']],
                   where: {
                      actionType: "dislike"
                   } ,
                   required: false
                }        
                ],
                order: [ ['createdAt','DESC'] ],
                where: {isDeleted:false},
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

export async function createPost(event: APIGatewayEvent, context: Context): Promise<any> {

    try {
        const data = JSON.parse(event.body);
        let postData = {
        "title" : data.title,
        "content": data.content,
        "postType": data.postType,
        "img": data.img,
        "UserId":  data.userId,
        "isDeleted":false
        };
        const x = await Post.create(postData);
        return {
            statusCode: 200,
            headers: getResponseHeaders(),
            body: JSON.stringify(x)
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

export async function postAction(event: APIGatewayEvent, context: Context): Promise<any> {

    try {
        const data = JSON.parse(event.body);
        let postData = {
        "postId" : data.postId,
        "userId": data.userId,
        "actionType": data.actionType,
        };
        const project = await PostAction.findOne({ where: [{ postId:  data.postId},{ userId:  data.userId}]});
        let result:any=[];
        if (project === null) {
            result= await PostAction.create(postData);
        } else {
            result = await PostAction.update(postData,{
                where: {
                  id: project.id
                }
              });
        }
        return {
            statusCode: 200,
            headers: getResponseHeaders(),
            body: JSON.stringify(result)
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

export async function deletePostById(event: APIGatewayEvent, context: Context): Promise<any> {
    let id = event.pathParameters.postId    
    try {
           let post = await Post.findByPk(id);
            if (!post) {
                return {
                    statusCode: 404,
                    headers: getResponseHeaders(),
                    error: JSON.stringify({ message: "Not found" })
                };
            }
            else{
                await post.update({isDeleted:true})
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