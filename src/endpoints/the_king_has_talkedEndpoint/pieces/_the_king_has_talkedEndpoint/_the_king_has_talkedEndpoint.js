import { GetFirestoreDocument, SendFirebaseMessage } from "../../../../services/FirestoreCRUD/FirebaseCRUD.js";
import { hashAPIKey } from "../../../../services/GenerateAPIKey/GenerateAPIKey.js";
import { DoTheAPIWork } from "../DoTheAPIWork/DoTheAPIWork.js";
import { the_king_has_talkedQuickWork } from "../DoTheAPIWork/pieces/the_king_has_talkedQuickWork.js";
import { the_king_has_talkedLongWork } from "../DoTheAPIWork/pieces/the_king_has_talkedLongWork.js";

export async function _the_king_has_talkedEndpoint(req, res) {
  // the API Key present in the 'apiKey' query parameter.
  // of the request URL.
  const { apiKey } = req.query;

  // if theres no API key present, then the adventure stops here.
  // code 410, no API Key available.
  if (!apiKey || apiKey == "null") {
    res
      .status(410)
      .send(
        "No API key was given, in the request url. If you're the boss/admin/king , provide your API key to prove it ;-)"
      );

    return;
  }

  // If an API key has been given by the user,
  // encode the API key given by the user,
  // then see if it exists in the API Key database.

  // king or cap ?
  const kingKey = process.env.KING_API_KEY;

  if (!kingKey) {
    res
      .status(415)
      .send(
        "The king API key is not set, so this endpoint is not active ;-)"
      );

    return;
  }

  const isKing = apiKey === kingKey;



  // if this API Key is not known to mankind....
  // the adventure stops here
  if (!isKing) {
    res
      .status(416)
      .send(
        "This API key is invalid/unknown. You are not the king."
      );

    return;
  }

  // If the stars are aligned, that means
  // the shizzle can go down !!!
  // The user seems to be legit, he passed the checks,
  // so lets do some work !
  else {
    // dear king, express yourself, your kingdom needs to hear you

    // the data passed by the API client.
    //
    // If you use Postman, the args are passed in the body,
    // with x-www-form-urlencoded chosen
    //
    // If you use Javascript or other similar languages,
    // its an object passed as the body of some HTTP request code
    // (axios, etc...)



    const { msg } = req.body;

    await SendFirebaseMessage(msg);

    res
      .status(200)
      .send(
        "Lord, you have spoketh ;-)"
      );

    return;
  }
}



