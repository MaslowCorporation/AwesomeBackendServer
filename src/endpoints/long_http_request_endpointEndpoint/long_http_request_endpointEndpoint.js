import { _long_http_request_endpointEndpoint } from "./pieces/_long_http_request_endpointEndpoint/_long_http_request_endpointEndpoint.js";

// Uncomment this if you want to upload a file 
//import { SetupMulter } from "./pieces/SetupMulter/SetupMulter.js";

// Set up Multer storage using diskStorage
// Uncomment this if you want to upload a file 
//const upload = SetupMulter();

// Create an endpoint named long_http_request_endpoint
// reachable via http://localhost:<apiPort>/long_http_request_endpoint
export function long_http_request_endpointEndpoint(app, stripe) {
  // Uncomment this, and rename photo to the file's FormData's name,
  // in the SDK side oth things,
  // if you want to upload a file 
  app.post("/long_http_request_endpoint", /*upload.single("photo"),*/ async (req, res) => {
    try {
      await _long_http_request_endpointEndpoint(req, res, stripe);

      return;
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occurred while trying to use the long_http_request_endpoint endpoint: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
