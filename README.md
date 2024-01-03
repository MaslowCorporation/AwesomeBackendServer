# maslow-gpt-api-v2 🌎

A humble and practical server ;-)


## Placeholders in this codebase

### package.json

<GITHUB_URL> = the https url of your github repo

<SERVER_URL> = the URL tied to your server

### index.js

<STRIPE_SECRET_KEY> = The secret key of your Stripe account, available here: 
https://dashboard.stripe.com/test/apikeys

### src/services/FirestoreCRUD/FirebaseCRUD.js

{
  /* Your Firestore admin data belongs here */
}

should be replaced with the Firestore admin data available on your Firestore account:

### src/AppConstants/Constants.js

<OPENAI_API_KEY> = The OpenAI account API Key

<cloudinary_cloud_name> = The cloud name of your Cloudinary account.

<cloudinary_upload_preset> = The Upload preset of your Cloudinary account. 
Go to Settings (gear icon) / Upload / Upload Presets.
Copy the unsigned upload preset.

<cloudinary_api_key> = The Cloudinary account api key

<cloudinary_api_secret> = The Cloudinary account api secret

<cloudinary_email> = The email address of your Cloudinary account

### src/endpoints/checkoutEndpoint/pieces/_checkoutEndpoint/_checkoutEndpoint.js

<STRIPE_TRANSACTION_TYPE> = The Stripe transaction type. For a one time payment, it is "payment"

<STRIPE_PAYMENT_TYPE> = The Stripe payment type during the subscription transaction.
To pay with credits cards, it is "card"

<STRIPE_ITEM_PRICE_ID> = The Stripe item price id

<API_URL> = The Base URL of your API/Server (for ex. https://my.ultra.api.io)
When your server isn't tied to a URL, during dev, you should put ```http://localhost:8080``` as the URL

### src/endpoints/checkoutCreditsEndpoint/pieces/_checkoutCreditsEndpoint/_checkoutCreditsEndpoint.js

<STRIPE_TRANSACTION_TYPE> = The Stripe transaction type. For a one time payment, it is "payment"

<STRIPE_PAYMENT_TYPE> = The Stripe payment type during the subscription transaction.
To pay with credits cards, it is "card"

<STRIPE_ITEM_PRICE_ID> = The Stripe item price id

<API_URL> = The Base URL of your API/Server (for ex. https://my.ultra.api.io)
When your server isn't tied to a URL, during dev, you should put ```http://localhost:8080``` as the URL


### src/endpoints/webhookEndpoint/pieces/_webhookEndpoint/_webhookEndpoint.js

<webhookSecret> = The Stripe Webhook secret


### .env

<set ```REDIS_URL="YOUR_REDIS_URL"``` if you want to upload on RailWay

## Troubleshooting

If you get an ugly error like

```
time="Sun, 15 Oct 2023 22:35:53 UTC" level=fatal msg="Error while authenticating with Stripe: Authorization failed, status=401, body={
0|stripe-w |   "error": {
0|stripe-w |     "code": "api_key_expired",
0|stripe-w |     "doc_url": "https://stripe.com/docs/error-codes/api-key-expired",
0|stripe-w |     "message": "Expired API Key provided: rk_test_*********************************************************************************************qhyLI9",
0|stripe-w |     "type": "invalid_request_error"      
0|stripe-w |   }
0|stripe-w | }
0|stripe-w | "
....
```

Then use the ```stripe login``` command to login again, the Stripe login token has an expiration date.

