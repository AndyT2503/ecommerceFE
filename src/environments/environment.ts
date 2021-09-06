// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const apiUrl = 'https://localhost:5001';
const firebaseConfig = {
  apiKey: "AIzaSyCO0LFM25Esi5tsmeG1MIIvwQr4gfXrDT0",
  authDomain: "ecommerce-andyt.firebaseapp.com",
  projectId: "ecommerce-andyt",
  storageBucket: "ecommerce-andyt.appspot.com",
  messagingSenderId: "140986464214",
  appId: "1:140986464214:web:d3df44974eaaf0c0915677",
  measurementId: "G-HGCE662ET9"
};

export const environment = {
  production: false,
  apiUrl,
  firebaseConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
