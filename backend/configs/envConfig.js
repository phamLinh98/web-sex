export const envConfig = {
  ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3344,
  MONGO_URI: process.env.MONGO_URI || "mongodb://root:example@localhost:27017",
  JWT_SECRET: process.env.JWT_SECRET || "binhchilinh1234",
  FIREBASE: {
    apiKey: process.env.FIREBASE_API_KEY || "apikey",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "authdomain",
    databaseURL: process.env.FIREBASE_DATABASE_URL || "databaseurl",
    projectId: process.env.FIREBASE_PROJECT_ID || "projectid",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "storagebucket",
    messagingSenderId:
      process.env.FIREBASE_MESSAGING_SENDER_ID || "messagingsenderid",
    appId: process.env.FIREBASE_APP_ID || "appid",
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || "measurementid",
  },
};
