// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false
};
export const firebaseConfig = {
  production: false,
  firebase:{
    apiKey: "AIzaSyBahlb8qk484-xwMHVltQTWT0kHDIwKpMY",
    authDomain: "bazinga-99607.firebaseapp.com",
    databaseURL: "https://bazinga-99607.firebaseio.com",
    projectId: "bazinga-99607",
    storageBucket: "bazinga-99607.appspot.com",
    messagingSenderId: "744507723919"
  }
};