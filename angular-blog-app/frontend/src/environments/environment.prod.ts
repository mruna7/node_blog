const base_url='https://hixqi0g738.execute-api.us-east-1.amazonaws.com/dev/'
export const environment = {
  production: true,
  cognitoUserPoolId:  'us-east-1_O0bloALi3',
  cognitoAppClientId: '7hauv0igkft36tipdd9iclimcp',
  GET_USER:base_url +"getuser/",
  CREATE_POST:base_url +"createPost",
  GET_ALL_POST:base_url +"getAllPost",
  POST_ACTION:base_url +"postAction",
  GET_SINGLE_POST:base_url +"getPostbyId",
  DELETE_POST:base_url+"deletePost/"
};
