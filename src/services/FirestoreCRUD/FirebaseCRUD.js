import admin from "firebase-admin";

// initialise cloud firestore avant utilisation
// Replace null with InitFirestore(); before using the shizzle
let db = InitFirestore();

// initialise cloud firestore avant utilisation
export function InitFirestore() {
  admin.initializeApp({
    credential: admin.credential.cert({
      "type": "service_account",
      "project_id": "maslow-669dd",
      "private_key_id": "96acdc9a79f73097561f791859239c9f8010dbb4",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCloxoeGXk2JsTX\nxIkBRLOTbDwlBb921iqDttubgDwuzi2C8d+gylvHHdkfa5Vp/ja5omsjzrYKzr8l\naC/NjA3LFfnwkE1qLVsIFOTwmGq4c5VQsckO6asFZdcbU1XIADk7tCQAlW8oceNv\nwzTrCyTW8m6ATHzL3xwDN5FBexLOO7sLAd7p7j1T4ikgDqmKvhV3ag3I/hLBmxBB\nwoi1aQWcbJNkii8+SUuLftXar3jwz88XY55I5NIF5CqviXUD4C9vGLz2yZBVuN+4\nbqaj3aAH7hCrUHQ5gUwC38qS5irzDcOJJfGx2sx31+96p75XOIM8FaCcfXVOzUuz\nYbtAROOZAgMBAAECggEAG4zXc+40v7xkZ/x5SqFiD8FO97F5uTXCIzUFA1uppvda\n5o7TQsFQe/wLozLtH+YitW8TIa+TjpSjgoCj2C0qwNQfmyhwApsXVcQemE4ht3Bc\n2OvZT1uvuy7HP/T1Laur2VxgffWyZChyoKJNaP2U275ogXqMv17qyouG45H+/MJP\nJgA0I8XzNs5amwpuKA584pNzBIe2KS2KP8v0E1DIl6tr803r1nnEonisRvmg8KGN\nK7Dj9V3KSrewv5L0wVjIMBYHrX0k9yzgbU8nWZk6ZpKSvsAgGnkpdbfZMMZxttJY\nDMuPCJ2/0Uj042tFf5xYrpkDJhgJHYIj0stjPIy+iQKBgQDiDKacAmly9d3kiLBG\ndQYdzzZ/U1npwMSfDIX+U6UzRLeIIeRD/2JtPYDHjC6XePfY///Ns7MIPBlplZl0\nqjlz4kYwc0KI5/C6LhSgBzvwQTy7KUvyTq1U6tFoMPP7iU0UHhulkyoNqCXsOMqJ\nRyGg3all8V+v66H2MN3Hcy7LzwKBgQC7lVT+1I55b8AA7BvdmfhLLOH205Q4o5Ak\nZZxEgh9aFvuV6cjeaedn64NulkJxyLK0EeSdGRtQQBPZ/y/7XUNfG/MKr3jBV7m4\nfQGpF+XG486ApFD4ODxJSSfaD+oUTC0WFSRalRkaBISazcBgsUrvc4Du3WSWpc4p\nejRmmKcsFwKBgQCzwgOsBG7+sG5oEhq7rMvUYLehwRK7REQXhsn3WWUBxB9+7hSr\nzibjYAlMpjlW0yelNM6jMcepQMGkqQaDM+rEMKhIVyAN5wQTyhk0uQv9HqPA4jI2\n2kIUSTeFd4hN+v2EhfzOSp0ihxjBJNhLGnmvhxXyr2O8bdE6CdoThZEtGQKBgB8f\nxfyKVCF+E0OT6YO5WmNOzSdhL8S+DtqbKXSMipsuGQxkv/l3ZPfvMd2VfOzYOh56\noY4XblrAZwrStqlkbhtHzenF96lM3vnnc/EUkAGSJt9dZDnrSsV2J/Ccl2BKy2hQ\nlbmZ55JTkZUF8peYkzBr38bCYUBFvpFPP4aOaZ59AoGBALU8KMc5/OJf8IWEHl2t\n9RuwIsvdjn4y8VWA0LYCoKd6irfS+bnYYYRd33kYmI3/FCgyr5pZHMK6qIHc3ipo\nj07QAOCY2ZaTSWC1gobCBDGJyMsRDbGZji09fsuKOJ953fEgeFYFx23rNhPjAFW9\nBCmiWMOF1v2AEc8MoiIlL87D\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-sjbj7@maslow-669dd.iam.gserviceaccount.com",
      "client_id": "106058742979478092465",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-sjbj7%40maslow-669dd.iam.gserviceaccount.com",
      "universe_domain": "googleapis.com"
    }),
  });

  const db = admin.firestore();

  return db;
}

// Create a document
export async function CreateFirestoreDocument({
  collectionName,
  documentData,
  documentId,
}) {
  try {
    if (!documentId) {
      // console.log( `You gave an invalid documentId`);
      return;
    }

    if (!collectionName) {
      // console.log( `You gave an invalid collectionName`);
      return;
    }

    const docRef = db.collection(collectionName).doc(documentId);
    await docRef.set(documentData);
    // console.log( "Document created with ID:", docRef.id);

    return docRef.id;
  } catch (error) {
    console.error("Error creating document:", error);

    return null;
  }
}

// Read a document by ID
export async function GetFirestoreDocument({ collectionName, documentId }) {
  try {
    if (!documentId) {
      // console.log( `You gave an invalid documentId`);
      return;
    }

    if (!collectionName) {
      // console.log( `You gave an invalid collectionName`);
      return;
    }

    const docRef = db.collection(collectionName).doc(documentId);
    const docSnapshot = await docRef.get();
    if (docSnapshot.exists) {
      // console.log( "Document data:", docSnapshot.data());

      return docSnapshot.data();
    } else {
      // console.log( "Document not found");

      return null;
    }
  } catch (error) {
    console.error("Error getting document:", error);

    return null;
  }
}

// Update a document by ID
export async function UpdateFirestoreDocument({
  collectionName,
  documentId,
  updateData,
}) {
  try {
    if (!documentId) {
      // console.log( `You gave an invalid documentId`);
      return;
    }

    if (!collectionName) {
      // console.log( `You gave an invalid collectionName`);
      return;
    }

    const docRef = db.collection(collectionName).doc(documentId);
    await docRef.update(updateData);
    // console.log( "Document updated:", docRef.id);

    return docRef.id;
  } catch (error) {
    console.error("Error updating document:", error);

    return null;
  }
}

// Delete a document by ID
export async function DeleteFirestoreDocument({ collectionName, documentId }) {
  try {
    if (!documentId) {
      // console.log( `You gave an invalid documentId`);
      return;
    }

    if (!collectionName) {
      // console.log( `You gave an invalid collectionName`);
      return;
    }

    const docRef = db.collection(collectionName).doc(documentId);
    await docRef.delete();
    // console.log( "Document deleted:", docRef.id);

    return docRef.id;
  } catch (error) {
    // console.error("Error deleting document:", error);

    return null;
  }
}

export async function GetCollection({ collectionName }) {
  try {
   
    if (!collectionName) {
      // console.log( `You gave an invalid collectionName`);
      return;
    }

    const colRef = db.collection(collectionName);
    const colSnapshot = await colRef.get();
    if (!colSnapshot.empty) {
      // console.log( "Document data:", docSnapshot.data());

      return colSnapshot.docs.map((doc) => {
        return doc.data();
      });
    } else {
      // console.log( "Document not found");

      return null;
    }
  } catch (error) {
    console.error("Error getting collection:", error);

    return null;
  }
}

export async function GoogleIDTokenIsValid(idToken) {


  // idToken comes from the client app
  return new Promise((resolve, reject) => {


    admin.auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {


        const uid = decodedToken.uid;

        resolve(true)
      })
      .catch((error) => {


        // Handle error

        resolve(false)
      });
  })
}


export async function SendFirebaseMessage(msg) {
  
  
  // Fetch the tokens from an external datastore (e.g. database)
  const tokensObjs = await GetCollection({ collectionName: "FCMKeys" })
  const tokens = tokensObjs && tokensObjs.map((tokData) => {
    return tokData.token;
  });

  

  // Send a message to devices with the registered tokens
  tokens && msg && await admin.messaging().sendMulticast({
    tokens,
    data: {
      notifee: JSON.stringify({
        body: msg,
        android: {
          channelId: 'default',
          actions: [
            {
              title: 'Mark as Read',
              pressAction: {
                id: 'read',
              },
            },
          ],
        },
      }),
    },
  });
}

