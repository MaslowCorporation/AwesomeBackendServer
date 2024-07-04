import { _get_google_api_keyEndpoint } from "./pieces/_get_google_api_keyEndpoint/_get_google_api_keyEndpoint.js";

// Uncomment this if you want to upload a file 
//import { SetupMulter } from "./pieces/SetupMulter/SetupMulter.js";

// Set up Multer storage using diskStorage
// Uncomment this if you want to upload a file 
//const upload = SetupMulter();

// Create an endpoint named get_google_api_key
// reachable via http://localhost:<apiPort>/get_google_api_key
export function get_google_api_keyEndpoint(app) {
  // Uncomment this, and rename photo to the file's FormData's name,
  // in the SDK side oth things,
  // if you want to upload a file 
  app.post("/get_google_api_key", /*upload.single("photo"),*/ async (req, res) => {
    try {
      await _get_google_api_keyEndpoint(req, res);

      return;
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occurred while trying to use the get_google_api_key endpoint: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
