import { _generate_audio_from_txtEndpoint } from "./pieces/_generate_audio_from_txtEndpoint/_generate_audio_from_txtEndpoint.js";

// Uncomment this if you want to upload a file 
//import { SetupMulter } from "./pieces/SetupMulter/SetupMulter.js";

// Set up Multer storage using diskStorage
// Uncomment this if you want to upload a file 
//const upload = SetupMulter();

// Create an endpoint named generate_audio_from_txt
// reachable via http://localhost:<apiPort>/generate_audio_from_txt
export function generate_audio_from_txtEndpoint(app) {
  // Uncomment this, and rename photo to the files FormDatas name,
  // in the SDK side oth things,
  // if you want to upload a file 
  app.post("/generate_audio_from_txt", /*upload.single("photo"),*/ async (req, res) => {
    try {
      await _generate_audio_from_txtEndpoint(req, res);

      return;
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occurred while trying to use the generate_audio_from_txt endpoint: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
