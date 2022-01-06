import User from '../model/user';
import Post from '../model/post';
import { getResponseHeaders } from '../util/util';
import { APIGatewayEvent, Context } from 'aws-lambda';
import PostAction from '../model/postAction';
import { sequelize } from '../model';

export async function getUserById(event: APIGatewayEvent, context: Context): Promise<any> {
    let id = event.pathParameters.userId    
    try {
           let user = await User.findByPk(id);
            if (!user) {
                return {
                    statusCode: 404,
                    headers: getResponseHeaders(),
                    error: JSON.stringify({ message: "Not found" })
                };
            }
            return {
                statusCode: 200,
                headers: getResponseHeaders(),
                body: JSON.stringify(user)
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


export async function getAllUser(event: APIGatewayEvent, context: Context): Promise<any> {
    try {
            let user=await User.findAll({ include: Post });
            if (!user) {
                return {
                    statusCode: 404,
                    headers: getResponseHeaders(),
                    error: JSON.stringify({ message: "Not found" })
                };
            }
            return {
                statusCode: 200,
                headers: getResponseHeaders(),
                body: JSON.stringify(user)
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

