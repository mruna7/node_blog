// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    cognitoUserPoolId:  'us-east-1_O0bloALi3',
    cognitoAppClientId: '7hauv0igkft36tipdd9iclimcp',
    GET_USER:"https://hixqi0g738.execute-api.us-east-1.amazonaws.com/dev/getuser/",
    CREATE_POST:"https://hixqi0g738.execute-api.us-east-1.amazonaws.com/dev/createPost",
    GET_ALL_POST:"https://hixqi0g738.execute-api.us-east-1.amazonaws.com/dev/getAllPost",
    POST_ACTION:"https://hixqi0g738.execute-api.us-east-1.amazonaws.com/dev/postAction",
    GET_SINGLE_POST:'https://hixqi0g738.execute-api.us-east-1.amazonaws.com/dev/getPostbyId'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
