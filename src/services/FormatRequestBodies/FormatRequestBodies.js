import bodyParser from "body-parser";

// Sets the Formatting stuff for HTTP requests
export function FormatRequestBodies(app, express) {
  // Stripe webhook shizzle
  app.use(
    express.json({
      limit: '50mb',
      verify: (req, res, buffer) => (req['rawBody'] = buffer),
    })
  );

  // allows serializable data in requests payloads
  app.use(express.urlencoded({ extended: true, limit: '50mb', }));

  // formatting to serve static files from the /public folder
  app.use(express.static('public'));
}
