# maslow-gpt-api-v2 🌎


A humble and practical server ;-)

## Placeholders in this codebase

### package.json

<GITHUB_URL> = the https url of your github repo

<SERVER_URL> = the URL tied to your server

### src/services/FirestoreCRUD/FirebaseCRUD.js

{
  /* Your Firestore admin data belongs here */
}

should be replaced with the Firestore admin JSON data available on your Firestore account.

Also, turn this line of code

```
let db = null; // InitFirestore();
```

into 

```
let db = InitFirestore();
```



### .env

Your .env file needs the following stuff 

```

# TEST_STRIPE_CREDENTIALS (localhost)
#
# Uncomment this block If you're testing your server monetization features, while using the
#
# npx maslow start-server-unix or start-server-win10
#STRIPE_SECRET_KEY="sk_test_xxxxxxx"
#STRIPE_TRANSACTION_TYPE_API_SUB="payment"
#STRIPE_PAYMENT_TYPE_API_SUB="card"
#STRIPE_ITEM_PRICE_ID_API_SUB="price_xxxxxxx"
#STRIPE_TRANSACTION_TYPE_5K_CRED="payment"
#STRIPE_PAYMENT_TYPE_5K_CRED="card"
#STRIPE_ITEM_PRICE_ID_5K_CRED="price_xxxxxx"
#API_URL="http://localhost:8080"
#WEBHOOK_SECRET="whsec_xxxxxxx"

# TEST_STRIPE_CREDENTIALS (cloud)
#
# Uncomment this block If you're testing your server monetization features 
# (AKA making test Stripe payments, etc...), 
# on RailWay, or any other server/VPS/Heroku/etc...
# and you're using a test webhook created from the stripe dashboard
# instead of using stripe-cli on localhost
#REDIS_URL="redis://xxxxxxxxxx@xxxxxxxxxxxxxxx"
#STRIPE_SECRET_KEY="sk_test_xxxxxxx"
#STRIPE_TRANSACTION_TYPE_API_SUB="payment"
#STRIPE_PAYMENT_TYPE_API_SUB="card"
#STRIPE_ITEM_PRICE_ID_API_SUB="price_xxxxxxx"
#STRIPE_TRANSACTION_TYPE_5K_CRED="payment"
#STRIPE_PAYMENT_TYPE_5K_CRED="card"
#STRIPE_ITEM_PRICE_ID_5K_CRED="price_xxxxxx"
#API_URL="http://localhost:8080"
#WEBHOOK_SECRET="whsec_xxxxxxx"

# LIVE_STRIPE_CREDENTIALS (cloud)
#
# Uncomment this block If you're implementing a live monetized server,
# ready to accept REAL payments (Stripe live mode) 
# on RailWay, or any other server/VPS/Heroku/etc...
# and you're using a live webhook created from the stripe dashboard
#REDIS_URL="redis://xxxxxxxxxx@xxxxxxxxxxxxxxx"
#STRIPE_SECRET_KEY="sk_live_xxxxxxx"
#STRIPE_TRANSACTION_TYPE_API_SUB="payment"
#STRIPE_PAYMENT_TYPE_API_SUB="card"
#STRIPE_ITEM_PRICE_ID_API_SUB="price_xxxxxxx"
#STRIPE_TRANSACTION_TYPE_5K_CRED="payment"
#STRIPE_PAYMENT_TYPE_5K_CRED="card"
#STRIPE_ITEM_PRICE_ID_5K_CRED="price_xxxxxx"
#API_URL="https://your_server_url.com"
#WEBHOOK_SECRET="whsec_xxxxxxx"

# The OPENAI API Key, to get wisdom from the A.I. wizard.
#
# Uncomment this env variable if you're using OpenAI in your backend
#OPENAI_API_KEY="sk-xxxxxxxx"


# The Cloudinary account's credentials, if you want to upload stuff.
#
# Uncomment this block if you want to use Cloudinary on your backend.
#cloudinary_email="cloudinary.acct@gmail.com"
#cloudinary_cloud_name="xxxxxxxxxx"
#cloudinary_upload_preset="xxxxxxxxxx"
#cloudinary_api_key="xxxxxxxxxxxx"
#cloudinary_api_secret="xxxxxxxxxxxxxxxx"


```

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

