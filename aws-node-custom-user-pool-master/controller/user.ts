import User from '../model/user';
import { getResponseHeaders } from '../util/util';
import { APIGatewayEvent, Context } from 'aws-lambda';
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


