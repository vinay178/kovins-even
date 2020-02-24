var admin = require("firebase-admin");
import buildFirebaseNotification from './notification'

var serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const firebaseNotification = buildFirebaseNotification(admin)

export default  firebaseNotification
