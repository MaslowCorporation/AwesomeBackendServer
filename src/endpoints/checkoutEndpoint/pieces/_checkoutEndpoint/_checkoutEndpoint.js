import { generateAPIKey } from "../../../../services/GenerateAPIKey/GenerateAPIKey.js";
import { GetUniqueID } from "../../../../services/GetUniqueID/GetUniqueID.js";

export async function _checkoutEndpoint(stripe, req, res) {

  const { google_user_uid, firebase_uid, email, username, username_photo } = req.body;

  const { apiKey, hashedAPIKey } = await generateAPIKey(firebase_uid);


  // more info here: 
  // https://stripe.com/docs/api/checkout/sessions/create?lang=node
  const session = await stripe.checkout.sessions.create({

    // the Stripe transaction type
    mode: process.env.STRIPE_TRANSACTION_TYPE_API_SUB,

    // l'adresse email optionnelle de l'user
    customer_email: email,

    // the stripe payment type(s)
    payment_method_types: [process.env.STRIPE_PAYMENT_TYPE_API_SUB],

    line_items: [
      {
        // le price id du produit stripe,
        // dispo section products du dashboard stripe

        price: process.env.STRIPE_ITEM_PRICE_ID_API_SUB,

        // how much of it
        quantity: 1
      },
    ],

    // l'url vers laquelle la page de paiement redirigera si
    // paiement successful
    success_url:
      `${process.env.API_URL}/api_sub_success.html?g=${firebase_uid}`,

    // l'url vers laquelle la page de paiement redirigera si
    // paiement cancel/fail
    cancel_url: `${process.env.API_URL}/error.html`,

    // thanks to this param, you can differentiate 
    // between the different purchases the user can make, 
    // in the checkout success webhook
    client_reference_id: "LifetimeAPISubscription",

    // ask for address
    //billing_address_collection: 'required',

    /** send an invoice email, or not ? */
    invoice_creation: {
      enabled: true,

      invoice_data: {
        description: `Thank you for subscribing ! Welcome aboard ! Your API Key: ${apiKey}.`,
      }
    },

    // some metadata for the webhook
    metadata: {
      ...req.body,
      google_user_uid: null
    },

  });


  // retourne a l'user les données permettant de souscrire
  // notamment l'url de paiement stripe
  res.send(session);
}
