import { GetFirestoreDocument } from "../../../../services/FirestoreCRUD/FirebaseCRUD.js";
import { hashAPIKey } from "../../../../services/GenerateAPIKey/GenerateAPIKey.js";
import { DoTheAPIWork } from "../DoTheAPIWork/DoTheAPIWork.js";
import { google_loginQuickWork } from "../DoTheAPIWork/pieces/google_loginQuickWork.js";
import { google_loginLongWork } from "../DoTheAPIWork/pieces/google_loginLongWork.js";

export async function _google_loginEndpoint(req, res) {
  return google_loginLongWork(req, res);

  // if your work takes less than 1 second to operate, 
  // you can use this simplified method to to the shizzle.
  //return google_loginQuickWork(req, res);

}



