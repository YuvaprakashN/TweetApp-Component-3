// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  LoginURL : 'http://Yuva-Tweetapp-LB-306326807.ap-south-1.elb.amazonaws.com/api/v1.0/tweets/login',
  RegisterationURL: 'http://Yuva-Tweetapp-LB-306326807.ap-south-1.elb.amazonaws.com/api/v1.0/tweets/register',
  rootUrl:'http://Yuva-Tweetapp-LB-306326807.ap-south-1.elb.amazonaws.com/api/v1.0/tweets/',
  
  getAllUser:'users/all',
  getUserByUserName:'user/search/' 
   
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
