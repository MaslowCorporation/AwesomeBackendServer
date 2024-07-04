import { Constants } from "../../../../AppConstants/Constants.js";
import { CreateFirestoreDocument } from "../../../../services/FirestoreCRUD/FirebaseCRUD.js";
import { generateAPIKey } from "../../../../services/GenerateAPIKey/GenerateAPIKey.js";
import { getFormattedDateTime } from "../../../../services/GetFormattedDateTime/GetFormattedDateTime.js";
import { CreateDatabaseDocument } from "../../../../services/LocalDatabase/LocalDatabase.js";

import { SendEmail } from "../../../../services/SendEmail/SendEmail.js";

/**
 *
 * @param {*} checkoutSession
 * @param {*} itemId
 *
 * @returns
 *
 */
export async function HandleAPISubscription(checkoutSession, itemId) {


    const customerId = checkoutSession.id;

    // this is the email address of htis customer
    // customerEmailFromCheckoutGeneration 
    // is the email address provided in the checkout endoint, 
    // during generation of the checkout link,
    // if provided.
    //
    // otherwise customerEmailFromCheckoutGeneration 
    // is the email provided in the stripe checkout page, 
    // by the user 
    const customerEmailFromCheckoutGeneration = checkoutSession.customer_email;
    const customerEmailFromCheckoutPage = checkoutSession.customer_details.email;
    const customerEmail = customerEmailFromCheckoutGeneration ?? customerEmailFromCheckoutPage;



    // google user data
    //
    // { accessToken, idToken: null, firebase_uid, email, username, username_photo }
    const googleUserInfo = checkoutSession.metadata;
    const firebase_uid = googleUserInfo.firebase_uid;

    console.log(`Customer's email: ${customerEmail}`);
    console.log(`💰 Customer ${customerId} just bought this item: ${itemId}`);
    //console.log('google uid = ' + googleUid)

    // Generate API key, and hashed API key.
    // (hashed = encoded, so filthy hackers don't steal my customers too easily)

    const { apiKey, hashedAPIKey } = await generateAPIKey(firebase_uid);

    console.log(`User's API Key: ${apiKey}`);
    console.log(`User's Hashed API Key: ${hashedAPIKey}`);

    // Store the hashed API key in your Firestore database of users API Keys
    // so the data is safe in the cloud
    await CreateFirestoreDocument({
        documentId: hashedAPIKey,
        collectionName: "APIKeys",
        documentData: {
            // is the API key active or not ?
            // since the user is a real OG who paid his dues, 
            // then he's allowed in my (your ;-) kingdom
            active: true,

            // the hashed key value
            hashedAPIKey,

            // the email address of the beautiful customer
            customerEmail,

            // the type of API subscription the user purchased
            subscriptionType: itemId,

            // the API credits of this fresh user.
            // The fresh user gets 5000 credits 
            // to begin his/her creative journey
            APICredits: 5000,

            // date of birth
            dateOfBirthUnix: Date.now(),
            dateOfBirth: getFormattedDateTime()
        },
    });

    // store the checkout data in the basket
    await CreateFirestoreDocument({
        documentId: hashedAPIKey,
        collectionName: "APIPurchases",
        documentData: {
            // the basket
            basket: [checkoutSession],

        },
    });

    // store the google user data
    await CreateFirestoreDocument({
        documentId: firebase_uid,
        collectionName: "GoogleUsers",
        documentData: {
            ...googleUserInfo,
        },
    });




    return;
}




