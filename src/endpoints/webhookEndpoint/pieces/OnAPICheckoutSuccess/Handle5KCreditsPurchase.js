import { GetFirestoreDocument, UpdateFirestoreDocument } from "../../../../services/FirestoreCRUD/FirebaseCRUD.js";
import { GetDatabaseDocument, UpdateDatabaseDocument } from "../../../../services/LocalDatabase/LocalDatabase.js";


/**
 *
 * @param {*} checkoutSession
 * @param {*} itemId
 *
 * @returns
 *
 */
export async function Handle5KCreditsPurchase(checkoutSession) {


    // the hashed API key of the beautiful soul who just bought 
    // 5000 API Credits
    const hashedAPIKey = checkoutSession.metadata.hashedAPIKey;

    // print some shizzle
    console.log(`💰 Customer with hashed API key ${hashedAPIKey} just bought 5000 API Credits !!`);

    // the current data stored in DB for this customer
    const customerData = await GetFirestoreDocument({
        documentId: hashedAPIKey,
        collectionName: "APIKeys",
    });



    // store the customer id in your Firestore database
    await UpdateFirestoreDocument({
        documentId: hashedAPIKey,
        collectionName: "APIKeys",
        updateData: {
            ...customerData,

            // increment the shizzle
            APICredits: customerData.APICredits + 5000
        },
    });


    // the current purchases history stored in DB for this customer
    const customerPurchaseData = await GetFirestoreDocument({
        documentId: hashedAPIKey,
        collectionName: "APIPurchases",
    });



    // store the customer purchase in your Firestore database

    customerPurchaseData.basket.push(checkoutSession)

    await UpdateFirestoreDocument({
        documentId: hashedAPIKey,
        collectionName: "APIPurchases",
        updateData: customerPurchaseData,
    });

    return;
}
