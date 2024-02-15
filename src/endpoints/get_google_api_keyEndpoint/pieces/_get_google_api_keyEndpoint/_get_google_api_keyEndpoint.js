import { GetFirestoreDocument, GoogleIDTokenIsValid } from "../../../../services/FirestoreCRUD/FirebaseCRUD.js";
import { generateAPIKey, hashAPIKey } from "../../../../services/GenerateAPIKey/GenerateAPIKey.js";
import { DoTheAPIWork } from "../DoTheAPIWork/DoTheAPIWork.js";
import { get_google_api_keyQuickWork } from "../DoTheAPIWork/pieces/get_google_api_keyQuickWork.js";
import { get_google_api_keyLongWork } from "../DoTheAPIWork/pieces/get_google_api_keyLongWork.js";

export async function _get_google_api_keyEndpoint(req, res) {


  // the UID Key present in the 'google_user_uid' query parameter.
  // of the request URL.
  const { email, google_user_uid } = req.body;


  // if there's no UID present, then the adventure stops here.
  // code 400, no API Key available.
  if (!google_user_uid) {
    res
      .status(400)
      .send(
        "No Firebase UID was given, in the request body. Login to Google, and add your user UID as the 'google_user_uid' key, in the request body."
      );

    return;
  }

  // if there's no email address given
  else if (!email) {
    res
      .status(400)
      .send(
        "No Google account email was given, in the request body. Add your Google email as the 'email' key, in the request body."
      );

    return;
  }

  const isFirebaseUIDValid = await GoogleIDTokenIsValid(google_user_uid);

  console.log(`is firebase uid valid ? ${isFirebaseUIDValid}`);


  // if the firebase UID is not valid
  if (!isFirebaseUIDValid) {
    res
      .status(400)
      .send(
        "The given Firebase UID is not valid."
      );

    return;
  }

  // If an Google Email has been given by the user,
  // see if it exists in the API Key database.

  const googleEmailToken = await generateAPIKey(email)

  // get the API client data, from his Firebase UID
  const APIClientData = await GetFirestoreDocument({
    documentId: googleEmailToken?.apiKey,
    collectionName: "GoogleUsers",
  });



  // if this UID is not known to mankind....
  // the adventure stops here
  if (!APIClientData) {
    res
      .status(403)
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


    // get the api key stub, from the DB
    const apiKeyStub = APIClientData.apiKey;

    // hash it
    const { apiKey } = await generateAPIKey(apiKeyStub);

    res.status(200).send({ apiKey });

    return;
  }
}



