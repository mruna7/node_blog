import * as userController from './controller/user';
import * as signupController from './controller/signup'
import { APIGatewayProxyHandler } from 'aws-lambda';

export const getUserById: APIGatewayProxyHandler = async (event, _context) => {
    return userController.getUserById(event, _context);
}

export const preSignUpTrigger = async (event, _context) => {
    return signupController.preSignUpTrigger(event, _context);
}

export const postConfirmationTrigger = async (event, _context) => {
    return signupController.postConfirmationTrigger(event, _context);
}