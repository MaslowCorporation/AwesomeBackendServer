import { _delete_file_cloudEndpoint } from "./pieces/_delete_file_cloudEndpoint/_delete_file_cloudEndpoint.js";

// Uncomment this if you want to upload a file 
//import { SetupMulter } from "./pieces/SetupMulter/SetupMulter.js";

// Set up Multer storage using diskStorage
// Uncomment this if you want to upload a file 
//const upload = SetupMulter();

// Create an endpoint named delete_file_cloud
// reachable via http://localhost:<apiPort>/delete_file_cloud
export function delete_file_cloudEndpoint(app, stripe) {
  // Uncomment this, and rename photo to the file's FormData's name,
  // in the SDK side oth things,
  // if you want to upload a file 
  app.post("/delete_file_cloud", /*upload.single("photo"),*/ async (req, res) => {
    try {
      await _delete_file_cloudEndpoint(req, res, stripe);

      return;
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occurred while trying to use the delete_file_cloud endpoint: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
