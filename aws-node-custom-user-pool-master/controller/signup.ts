import User from '../model/user';
import { getResponseHeaders } from '../util/util';
export const preSignUpTrigger = async (event, context) => {
    try {
      console.log('User created: User-Pool', event.userPoolId+", UserId: " + event.userName+", event:"+event);
      context.done(null, event);
      const userCount = await User.count({ where : { email : event.request.userAttributes.email}});
      if (userCount == 0) {
        let userData = {
          "id" : event.userName,
          "name": event.request.userAttributes.name,
          "email": event.request.userAttributes.email,
          "emailVerified": false,
          "userType": event.request.userAttributes.userType,
          "currentState": "Pending"
        };
    
        const x = await User.create(userData);
      }
  
      context.done(null, event);
      return {
        statusCode: 200,
        headers: getResponseHeaders(),
        body: "Operation Completed"
      }
  
    }
    catch (err) {
      console.log(err);
    }
  
  }

  export const postConfirmationTrigger = async (event, context) => {
    try {
      console.log('User confirmed: User-Pool', event.userPoolId+", UserId: " + event.userName+", event:"+event);
      context.done(null, event);
      let user = await User.findOne({ where: { email: event.request.userAttributes.email } })
  
      if (user) {
        await user.update({
          id: event.userName,
          emailVerified: true,
          currentState: "Active"
        });
    
        context.done(null, event);
  
        return {
          statusCode: 200,
          headers: getResponseHeaders(),
          body: "Operation Completed"
        }  
      } else {
        throw new Error('User Not found in DB');
      }
    }
    catch (err) {
      console.log(err);
    }
  }