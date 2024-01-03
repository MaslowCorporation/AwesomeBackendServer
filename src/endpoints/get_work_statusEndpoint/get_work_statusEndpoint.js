import { _get_work_statusEndpoint } from "./pieces/_get_work_statusEndpoint/_get_work_statusEndpoint.js";

// Uncomment this if you want to upload a file 
//import { SetupMulter } from "./pieces/SetupMulter/SetupMulter.js";

// Set up Multer storage using diskStorage
// Uncomment this if you want to upload a file 
//const upload = SetupMulter();

// Create an endpoint named get_work_status
// reachable via http://localhost:<apiPort>/get_work_status
export function get_work_statusEndpoint(app, stripe) {
  // Uncomment this, and rename photo to the file's FormData's name,
  // if you want to upload a file 
  app.post("/get_work_status/:id", /*upload.single("photo"),*/ async (req, res) => {
    try {

      await _get_work_statusEndpoint(req, res, stripe);

      return;
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occurred while trying to use the get_work_status endpoint: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
