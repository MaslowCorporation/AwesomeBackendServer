import { GetJobByID } from "../../../../BackgroundWorker/GetJobByID.js";
import { GetJobQueue } from "../../../../BackgroundWorker/GetJobQueue.js";
import { GetFirestoreDocument } from "../../../../services/FirestoreCRUD/FirebaseCRUD.js";
import { hashAPIKey } from "../../../../services/GenerateAPIKey/GenerateAPIKey.js";
import { GetDatabaseDocument } from "../../../../services/LocalDatabase/LocalDatabase.js";

import { DoTheAPIWork } from "../DoTheAPIWork/DoTheAPIWork.js";
import { UpdateAPIUsage } from "../UpdateAPIUsage/UpdateAPIUsage.js";
import { Constants } from "../../../../AppConstants/Constants.js";

export async function _get_work_statusEndpoint(req, res, stripe) {

  // la clé API présente dans l'URL de requête
  const { apiKey } = req.query;

  // si la clé API n'a pas été fournie dans l'URL de requête
  // l'aventure s'arrête ici. code 400, pas de clé API dispo
  if (!apiKey) {
    // retourne un bon vieux 4xx au client
    res
      .status(400)
      .send(
        "No API key was given, in the request url. Please subscribe to the API, copy the API key I will give you, and add this API key as a 'apiKey' query parameter, in the request url."
      );

    return;
  }

  // encode la clé API fournie par le client,
  // afin de la comparer a celle stockée dans
  // la base de données des clients de notre API
  const hashedAPIKey = hashAPIKey(apiKey);

  // get the API client data, from his Hashed API Key
  
  const APIClientData = await GetFirestoreDocument({
    collectionName: "APIKeys",
    documentId: hashedAPIKey,
  });



  // si cette clé API n'existe pas dans notre base de données client,
  if (!APIClientData) {
    // ...alors l'aventure s'arrête ici
    res
      .status(403)
      .send(
        "This API key is invalid/unknown. Please add a valid API key to the request url."
      );

    return;
  }

  // si l'user est inactif/desactivé/timed out...
  else if (!APIClientData.active) {
    // ...alors l'aventure s'arrête ici
    res.status(403).send("This API key is currently inactive/disabled.");

    return;
  }

  // si l'user n'a plus de credits API
  else if (APIClientData.APICredits <= 0) {
    // ...alors l'aventure s'arrête ici
    res.status(409).send("You have no API Credits left.... Get some API credits, adventurer");

    return;
  }

  // autrement, si cette clé API est valide...
  else {
    // the queue
    let workQueue = GetJobQueue();

    await GetJobByID({req, res, workQueue});

    return;
  }
}
