import { GetCollection } from "../FirestoreCRUD/FirebaseCRUD.js";

export let APIClientsData = [];

const delayMinutes = 1;
const delayMsec = delayMinutes * 60 * 1000;

export async function GetAPIClientsPeriodically() {
    try {
        APIClientsData = await GetCollection({
            collectionName: "APIKeys",
        });

        console.log("let's start the periodic update of the API client data !");
        //console.log(JSON.stringify(APIClientsData, null, 2))

        setInterval(
            async () => {
                console.log("let's update the API client data now !");

                // get the API client data, from his Hashed API Key
                APIClientsData = await GetCollection({
                    collectionName: "APIKeys",
                });

                return;

            },
            delayMsec
        );
    } catch (error) {
        //
    }
}

export function GetAPIClientData(hashedAPIKey) {
    return APIClientsData.find((clientData, idx) => {
        return clientData.hashedAPIKey == hashedAPIKey;
    });
}