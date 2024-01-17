import { GetFirestoreDocument, UpdateFirestoreDocument } from "../FirestoreCRUD/FirebaseCRUD.js";
import { GetDatabaseDocument, UpdateDatabaseDocument } from "../LocalDatabase/LocalDatabase.js";


export async function UseAPICredits(job, costInCredits) {
  const newUserBalance = await UseAPICreditsFirestore(job, costInCredits);
  
  return newUserBalance;
}

async function UseAPICreditsFirestore(job, costInCredits) {
  

  const APIClientData = await GetFirestoreDocument({
    documentId: job.data?.hashedAPIKey,
    collectionName: "APIKeys",
  });

  const currentAPICredits = APIClientData?.APICredits;
  const newUserBalance = currentAPICredits - costInCredits;

  await UpdateFirestoreDocument({
    collectionName: "APIKeys",
    documentId: job.data?.hashedAPIKey,
    updateData: {
      APICredits: newUserBalance ?? currentAPICredits
    }
  });

  return newUserBalance ?? currentAPICredits;
}

