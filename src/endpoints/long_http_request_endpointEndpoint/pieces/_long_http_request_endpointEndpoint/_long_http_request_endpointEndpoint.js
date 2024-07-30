import { GetFirestoreDocument } from "../../../../services/FirestoreCRUD/FirebaseCRUD.js";
import { hashAPIKey } from "../../../../services/GenerateAPIKey/GenerateAPIKey.js";
import { DoTheAPIWork } from "../DoTheAPIWork/DoTheAPIWork.js";
import { long_http_request_endpointQuickWork } from "../DoTheAPIWork/pieces/long_http_request_endpointQuickWork.js";
import { long_http_request_endpointLongWork } from "../DoTheAPIWork/pieces/long_http_request_endpointLongWork.js";
import { GetDatabaseDocument } from "../../../../services/LocalDatabase/LocalDatabase.js";
import { Constants } from "../../../../AppConstants/Constants.js";
import { GetAPIClientData } from "../../../../services/GetAPIClientsPeriodically/GetAPIClientsPeriodically.js";

export async function _long_http_request_endpointEndpoint(req, res, stripe) {
  // the API Key present in the 'apiKey' query parameter.
  // of the request URL.
  const { apiKey } = req.query;

  // if there's no API key present, then the adventure stops here.
  // code 410, no API Key available.
  if (!apiKey || apiKey == "null") {
    // retourne un bon vieux 4xx au client
    res
      .status(410)
      .send(
        "No API key was given, in the request url. Please subscribe to the API, copy the API key I will give you, and add this API key as a 'apiKey' query parameter, in the request url."
      );

    return;
  }

  // If an API key has been given by the user,
  // encode the API key given by the user,
  // then see if it exists in the API Key database.
  const hashedAPIKey = hashAPIKey(apiKey);

  // get the API client data, from his Hashed API Key

  const APIClientData = GetAPIClientData(hashedAPIKey);



  // if this API Key is not known to mankind....
  // the adventure stops here
  if (!APIClientData) {
    res
      .status(411)
      .send(
        "This API key is invalid/unknown. Please add a valid API key to the request url."
      );

    return;
  }

  // if the API Key is currently disabled.
  // That means this user has been excluded/flagged/banned
  // so the adventure stops here.
  else if (!APIClientData.active) {
    res.status(413).send("This API key is currently inactive/disabled.");

    return;
  }

  // If the API Client has no API Credits left,
  // the adventure stops here
  else if (APIClientData.APICredits <= 0) {
    res.status(414).send("You have no API Credits left.... Get some API credits, adventurer");

    return;
  }

  // If the stars are aligned, that means
  // the shizzle can go down !!!
  // The user seems to be legit, he passed the checks,
  // so let's do some work !
  else {
    // if your work takes time to execute, create a background work
    return long_http_request_endpointLongWork(req, res);

    // if your work takes less than 1 second to operate, 
    // you can use this simplified method to to the shizzle.
    //return long_http_request_endpointQuickWork(req, res);
  }
}



