import { apiPort } from "../../../index.js";
import { GetAllDatabaseDocuments, GetDatabaseByName, InitDatabase } from "../LocalDatabase/LocalDatabase.js";

// exécute l'appli express
export async function startServer(app) {

  const properPort = process.env.PORT || apiPort;

  app.listen(properPort, () => {
    console.log(`Running on http://localhost:${properPort}`);
  });

}
