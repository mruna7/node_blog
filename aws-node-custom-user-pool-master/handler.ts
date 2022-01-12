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

export const getAllPost: APIGatewayProxyHandler = async (event, _context) => {
    return await postController.getAllPost(event, _context);
}