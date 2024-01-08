import bodyParser from "body-parser";

// Sets the Formatting stuff for HTTP requests
export function FormatRequestBodies(app, express) {
  // Stripe webhook shizzle
  app.use(
    express.json({
      verify: (req, res, buffer) => (req['rawBody'] = buffer),
    })
  );

  // allows serializable data in requests payloads
  app.use(express.urlencoded({ extended: true }));

  // formatting to serve static files from the /public folder
  app.use(express.static('public'));
}
