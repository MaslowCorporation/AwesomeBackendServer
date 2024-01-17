import { randomBytes } from "crypto";
import { createHash } from "crypto";
import { GetFirestoreDocument } from "../FirestoreCRUD/FirebaseCRUD.js";

// Génère une clé API
export async function generateAPIKey(apiKeyQueryParam) {
  const apiKey = hashAPIKey(apiKeyQueryParam);
  const hashedAPIKey = hashAPIKey(apiKey);

  return { hashedAPIKey, apiKey };

}

// Hash the API key
export function hashAPIKey(apiKey) {
  const hashedAPIKey = createHash("sha256").update(apiKey).digest("hex");

  return hashedAPIKey;
}
