var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "yoururl",
});

const deleteAllUsers = (nextPageToken) => {
  let uids = [];
  admin
    .auth()
    .listUsers(100, nextPageToken)
    .then((listUsersResult) => {
      uids = uids.concat(
        listUsersResult.users.map((userRecord) => userRecord.uid)
      );
      console.log(uids);
      if (listUsersResult.pageToken) {
        deleteAllUsers(listUsersResult.pageToken);
      }
    })
    .catch((error) => {
      console.log("Error listing users:", error);
    })
    .finally(() => {
      admin.auth().deleteUsers(uids);
    });
};

deleteAllUsers();
