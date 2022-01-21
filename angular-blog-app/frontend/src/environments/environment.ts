// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const base_url='https://hixqi0g738.execute-api.us-east-1.amazonaws.com/dev/'
export const environment = {
    
    production: false,
    cognitoUserPoolId:  'us-east-1_O0bloALi3',
    cognitoAppClientId: '7hauv0igkft36tipdd9iclimcp',
    GET_USER: base_url +"getuser/",
    CREATE_POST:base_url +"createPost",
    GET_ALL_POST:base_url +"getAllPost",
    POST_ACTION:base_url +"postAction",
    GET_SINGLE_POST:base_url +"getPostbyId"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
