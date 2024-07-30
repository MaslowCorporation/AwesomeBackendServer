import { apiPort } from "../../../index.js";
import { GetAPIClientsPeriodically } from "../GetAPIClientsPeriodically/GetAPIClientsPeriodically.js";
import { GetAllDatabaseDocuments, GetDatabaseByName, InitDatabase } from "../LocalDatabase/LocalDatabase.js";

// exécute l'appli express
export async function startServer(app) {

  const properPort = process.env.PORT || apiPort;

  app.listen(properPort, () => {
    console.log(`Running on http://localhost:${properPort}`);

    // periodically et the API client data, so the Cloud Firestore
    // quota don't get blown up by some stupid DDOS or some infinite loop
    GetAPIClientsPeriodically();
  });

}
