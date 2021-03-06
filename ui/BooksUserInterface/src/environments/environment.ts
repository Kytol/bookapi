// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  post: "http://localhost:5001/booksapifirebase/us-central1/app/api/create",
  read: "http://localhost:5001/booksapifirebase/us-central1/app/api/read/",
  readall: "http://localhost:5001/booksapifirebase/us-central1/app/api/read",
  put: "http://localhost:5001/booksapifirebase/us-central1/app/api/update/",
  delete: "http://localhost:5001/booksapifirebase/us-central1/app/api/delete/",
  deleteall: "http://localhost:5001/booksapifirebase/us-central1/app/api/delete-all"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
