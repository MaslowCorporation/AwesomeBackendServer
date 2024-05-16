import { _get_gpt_funcEndpoint } from "./pieces/_get_gpt_funcEndpoint/_get_gpt_funcEndpoint.js";

// Uncomment this if you want to upload a file 
//import { SetupMulter } from "./pieces/SetupMulter/SetupMulter.js";

// Set up Multer storage using diskStorage
// Uncomment this if you want to upload a file 
//const upload = SetupMulter();

// Create an endpoint named get_gpt_func
// reachable via http://localhost:<apiPort>/get_gpt_func
export function get_gpt_funcEndpoint(app, stripe) {
  // Uncomment this, and rename photo to the file's FormData's name,
  // in the SDK side oth things,
  // if you want to upload a file 
  app.post("/get_gpt_func", /*upload.single("photo"),*/ async (req, res) => {
    try {
      await _get_gpt_funcEndpoint(req, res, stripe);

      return;
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occurred while trying to use the get_gpt_func endpoint: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
