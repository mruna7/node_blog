import * as userController from './controller/user';
import * as postController from './controller/post';
import * as signupController from './controller/signup';
import * as createdbController from './controller/createdb';
import { APIGatewayProxyHandler } from 'aws-lambda';

export const getUserById: APIGatewayProxyHandler = async (event, _context) => {
    return await userController.getUserById(event, _context);
}

export const preSignUpTrigger = async (event, _context) => {
    return await signupController.preSignUpTrigger(event, _context);
}

export const postConfirmationTrigger = async (event, _context) => {
    return await signupController.postConfirmationTrigger(event, _context);
}

export const createdb = async (event, _context) => {
    return await createdbController.createdb(event, _context);
}

export const getAllUser: APIGatewayProxyHandler = async (event, _context) => {
    return await userController.getAllUser(event, _context);
}
export const deleteUserById: APIGatewayProxyHandler = async (event, _context) => {
    return await userController.deleteUserById(event, _context);
}
export const getAllPost: APIGatewayProxyHandler = async (event, _context) => {
    return await postController.getAllPost(event, _context);
}

export const createPost:APIGatewayProxyHandler = async (event, _context) => {
    return await  postController.createPost(event, _context);
}
export const postAction:APIGatewayProxyHandler = async (event, _context) => {
    return await  postController.postAction(event, _context);
}

export const deletePostById: APIGatewayProxyHandler = async (event, _context) => {
    return await postController.deletePostById(event, _context);
}

export const getPostbyId: APIGatewayProxyHandler = async (event, _context) => {
    return await postController.getPostbyId(event, _context);
}

export const getAllPostAction: APIGatewayProxyHandler = async (event, _context) => {
    return await postController.getAllPostAction(event, _context);
}