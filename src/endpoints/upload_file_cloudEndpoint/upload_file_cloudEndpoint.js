import { _upload_file_cloudEndpoint } from "./pieces/_upload_file_cloudEndpoint/_upload_file_cloudEndpoint.js";

// Uncomment this if you want to upload a file 
import { SetupMulter, SetupMulterMemory } from "./pieces/SetupMulter/SetupMulter.js";

// Set up Multer storage using diskStorage
// Uncomment this if you want to upload a file 
//const upload = SetupMulter();

// Setup Multer in memory, for environments like Heroku where
// the file system is not available
const upload = SetupMulterMemory();

// Create an endpoint named upload_file_cloud
// reachable via http://localhost:<apiPort>/upload_file_cloud
export function upload_file_cloudEndpoint(app, stripe) {
  // Uncomment this, and rename photo to the file's FormData's name,
  // in the SDK side oth things,
  // if you want to upload a file 
  app.post("/upload_file_cloud", upload.single("cloud_file"), async (req, res) => {
    try {
      await _upload_file_cloudEndpoint(req, res, stripe);

      return;
    } catch (error) {

      res
        .status(400)
        .send(
          "A problem occurred while trying to use the upload_file_cloud endpoint: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
