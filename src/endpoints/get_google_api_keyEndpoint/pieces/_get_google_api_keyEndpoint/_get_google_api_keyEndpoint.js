import { GetFirestoreDocument, GoogleIDTokenIsValid } from "../../../../services/FirestoreCRUD/FirebaseCRUD.js";
import { generateAPIKey, hashAPIKey } from "../../../../services/GenerateAPIKey/GenerateAPIKey.js";
import { DoTheAPIWork } from "../DoTheAPIWork/DoTheAPIWork.js";
import { get_google_api_keyQuickWork } from "../DoTheAPIWork/pieces/get_google_api_keyQuickWork.js";
import { get_google_api_keyLongWork } from "../DoTheAPIWork/pieces/get_google_api_keyLongWork.js";

export async function _get_google_api_keyEndpoint(req, res) {


  // the UID Key present in the 'firebase_uid' parameter
  const { firebase_uid } = req.body;


  // if there's no UID present, then the adventure stops here.
  if (!firebase_uid) {
    res
      .status(417)
      .send(
        "No Firebase UID was given, in the request body. Login to Google, and add your user UID as the 'firebase_uid' key, in the request body."
      );

    return;
  }

  // If a Firebase UID has been given by the user,
  // see if it exists in the API Key database.

  // get the API client data, from his Firebase UID
  const APIClientData = await GetFirestoreDocument({
    documentId: firebase_uid,
    collectionName: "GoogleUsers",
  });



  // if this UID is not known to mankind....
  // the adventure stops here
  if (!APIClientData) {
    res
      .status(412)
      .send(
        "This Firebase UID is John Doe on our side. Please add a valid Google user id to the request body."
      );

    return;
  }


  // If the stars are aligned, that means
  // the shizzle can go down !!!
  // The user seems to be legit, he passed the checks,
  // so let's do some work !
  else {
    const { apiKey } = await generateAPIKey(firebase_uid);

    res.status(200).send({ apiKey });

    return;
  }
}



