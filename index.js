import 'dotenv/config';


// Utilities and stuff
import express from "express";
import stripe from "stripe";

import { FormatRequestBodies } from "./src/services/FormatRequestBodies/FormatRequestBodies.js";
import { startServer } from "./src/services/StartServer/StartServer.js";
import { InitAppStrings } from "./src/stringRepos/AppStrings/AppStrings.js";

import { InitRateLimiter } from './src/services/InitRateLimiter/InitRateLimiter.js';

// Starterpack API endpoints
import { myAPIEndpoint } from "./src/endpoints/myAPIEndpoint/myAPIEndpoint.js";
import { checkoutEndpoint } from "./src/endpoints/checkoutEndpoint/checkoutEndpoint.js";
import { webhookEndpoint } from "./src/endpoints/webhookEndpoint/webhookEndpoint.js";
import { checkoutCreditsEndpoint } from './src/endpoints/checkoutCreditsEndpoint/checkoutCreditsEndpoint.js';
import { update_work_dataEndpoint } from "./src/endpoints/update_work_dataEndpoint/update_work_dataEndpoint.js";
import { get_work_statusEndpoint } from "./src/endpoints/get_work_statusEndpoint/get_work_statusEndpoint.js";
import { get_api_client_infoEndpoint } from "./src/endpoints/get_api_client_infoEndpoint/get_api_client_infoEndpoint.js";



// The imports for Your own endpoints that you created using the command:
// npx maslow add-api-endpoint
// DON'T TOUCH the comment below !!!
/* PLOP_INJECT_IMPORT */



/**
 * OYé OYé CITOYENS !!
 *
 * Cette humble API nommée maslow-gpt-api-v2,
 * à été construite avec l'aide de:
 *
 * https://www.youtube.com/watch?v=MbqSMgMAzxU
 *
 */

// le port sur lequel notre API fonctionne
export const apiPort = 8080;

// permet de créer des endpoints
// pour notre sainte API
export const app = express();


// initialize the rate limiter
InitRateLimiter(app);

/**
 * 
 * To handle webhooks safely,
 * we need to verify the webhook signature to guarantee that it actually came from Stripe.
 * 
 * The webhook requires the request body,
 * as a raw buffer,
 * which we can format with some express middleware.
 */
FormatRequestBodies(app, express);

// init de strings intl
InitAppStrings();

/**
 * 
 * Uncomment this code if you want to monetize your API with Stripe
 *
// le secret key du compte stripe, dispo sections
// developers du dashboard stripe
// https://dashboard.stripe.com/test/apikeys
const stripe_secret_key = process.env.STRIPE_SECRET_KEY;

// initialse l'instance de stripe,
// nécessaire pour pouvoir effectuer des requetes payantes
const stripeInstance = new stripe(stripe_secret_key);

*/

// Your own endpoints that you created using the command:
// npx maslow add-api-endpoint
// DON'T TOUCH the comment below !!!
/* PLOP_INJECT_ENDPOINT_INIT */



/** 
 * 
 * Below are all the default endpoints of your server.
 * 
 * The endpoints for monetization, background work handling, etc...
 * 
 * Uncomment the 
 * 
 * checkoutEndpoint, 
 * webhookEndpoint,
 * checkoutCreditsEndpoint
 * get_api_client_infoEndpoint
 * update_work_dataEndpoint
 * get_work_statusEndpoint
 * 
 * endpoints if you want to monetize your server
 **/

// crée un endpoint de type POST, pour paiements Stripe,
// ceci permet aux users
// de souscrire à notre API, puis de recevoir 
// un email de confirmation via le webhookEndpoint
// reachable via http://localhost:<apiPort>/checkout
//checkoutEndpoint(app, stripeInstance);

// un webhook est un endpoint dans notre API,
// qui recoit des données venant de stripe,
// quand shit is going down (important events and such)
// pour tester le webhook, suis ces instructions:
// https://stripe.com/docs/stripe-cli
// ce webhook sert, entre autres,
// a recupérer les données d'abonnés tout juste abonnés.
// ici s'implémente de quoi fournir à l'user sa clé API
// (via email/phone)
//webhookEndpoint(app, stripeInstance);


// crée un endpoint de type POST, pour paiements Stripe,
// ceci permet aux users
// de souscrire à notre API, puis de recevoir 
// un email de confirmation via le webhookEndpoint
// reachable via http://localhost:<apiPort>/checkout<QTY_CREDITS>
//checkoutCreditsEndpoint(app, stripeInstance, 5000);

// crée un endpoint nommé get_api_client_info
// reachable via http://localhost:<apiPort>/get_api_client_info
//get_api_client_infoEndpoint(app, stripeInstance);

// crée un endpoint nommé update_work_data
// reachable via http://localhost:<apiPort>/update_work_data
//update_work_dataEndpoint(app, stripeInstance);

// crée un endpoint nommé get_work_status
// reachable via http://localhost:<apiPort>/get_work_status
//get_work_statusEndpoint(app, stripeInstance);

// this is a dummy GET API endpoint for testing purposes.
// crée un endpoint nommé myAPI (GET)
// reachable via GET http://localhost:<apiPort>/myAPI
// delete or comment this myAPIEndpoint(app); line when in production 
myAPIEndpoint(app);

// exécute l'appli express
startServer(app);


