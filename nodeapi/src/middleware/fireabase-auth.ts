import * as admin from 'firebase-admin';
// import * as config from '../firebase-config/serviceAccount.json';

// admin.initializeApp({
//  credential: admin.credential.cert(config as admin.ServiceAccount),
// });

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID || 'test-one-eb77e',
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
})

export default admin