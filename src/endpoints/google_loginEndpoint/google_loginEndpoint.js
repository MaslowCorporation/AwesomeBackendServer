import { _google_loginEndpoint } from "./pieces/_google_loginEndpoint/_google_loginEndpoint.js";

// Uncomment this if you want to upload a file 
//import { SetupMulter } from "./pieces/SetupMulter/SetupMulter.js";

// Set up Multer storage using diskStorage
// Uncomment this if you want to upload a file 
//const upload = SetupMulter();

// Create an endpoint named google_login
// reachable via http://localhost:<apiPort>/google_login
export function google_loginEndpoint(app) {
  // Uncomment this, and rename photo to the file's FormData's name,
  // in the SDK side oth things,
  // if you want to upload a file 
  app.post("/google_login", /*upload.single("photo"),*/ async (req, res) => {
    try {
      await _google_loginEndpoint(req, res);

      return;
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occurred while trying to use the google_login endpoint: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
