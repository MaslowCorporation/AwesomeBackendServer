import { _translate_txtEndpoint } from "./pieces/_translate_txtEndpoint/_translate_txtEndpoint.js";

// Uncomment this if you want to upload a file 
//import { SetupMulter } from "./pieces/SetupMulter/SetupMulter.js";

// Set up Multer storage using diskStorage
// Uncomment this if you want to upload a file 
//const upload = SetupMulter();

// Create an endpoint named translate_txt
// reachable via http://localhost:<apiPort>/translate_txt
export function translate_txtEndpoint(app, stripe) {
  // Uncomment this, and rename photo to the file's FormData's name,
  // in the SDK side oth things,
  // if you want to upload a file 
  app.post("/translate_txt", /*upload.single("photo"),*/ async (req, res) => {
    try {
      await _translate_txtEndpoint(req, res, stripe);

      return;
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occurred while trying to use the translate_txt endpoint: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
