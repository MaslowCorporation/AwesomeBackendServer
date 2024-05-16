import { _update_work_dataEndpoint } from "./pieces/_update_work_dataEndpoint/_update_work_dataEndpoint.js";

// Uncomment this if you want to upload a file 
//import { SetupMulter } from "./pieces/SetupMulter/SetupMulter.js";

// Set up Multer storage using diskStorage
// Uncomment this if you want to upload a file 
//const upload = SetupMulter();

// Create an endpoint named update_work_data
// reachable via http://localhost:<apiPort>/update_work_data
export function update_work_dataEndpoint(app, stripe) {
  // Uncomment this, and rename photo to the file's FormData's name,
  // if you want to upload a file 
  app.post("/update_work_data/:id", /*upload.single("photo"),*/ async (req, res) => {
    try {
      await _update_work_dataEndpoint(req, res, stripe);

      return;
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occurred while trying to use the update_work_data endpoint: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
