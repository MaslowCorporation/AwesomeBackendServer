import { _the_king_has_talkedEndpoint } from "./pieces/_the_king_has_talkedEndpoint/_the_king_has_talkedEndpoint.js";

// Uncomment this if you want to upload a file 
//import { SetupMulter } from "./pieces/SetupMulter/SetupMulter.js";

// Set up Multer storage using diskStorage
// Uncomment this if you want to upload a file 
//const upload = SetupMulter();

// Create an endpoint named the_king_has_talked
// reachable via http://localhost:<apiPort>/the_king_has_talked
export function the_king_has_talkedEndpoint(app) {
  // Uncomment this, and rename photo to the files FormDatas name,
  // in the SDK side oth things,
  // if you want to upload a file 
  app.post("/the_king_has_talked", /*upload.single("photo"),*/ async (req, res) => {
    try {
      await _the_king_has_talkedEndpoint(req, res);

      return;
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occurred while trying to use the the_king_has_talked endpoint: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
