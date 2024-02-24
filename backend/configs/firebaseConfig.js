import admin from "firebase-admin";

import serviceAccounts from "../service-account-file.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccounts),
});