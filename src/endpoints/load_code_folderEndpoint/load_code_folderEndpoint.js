import { _load_code_folderEndpoint } from "./pieces/_load_code_folderEndpoint/_load_code_folderEndpoint.js";

// Uncomment this if you want to upload a file 
//import { SetupMulter } from "./pieces/SetupMulter/SetupMulter.js";

// Set up Multer storage using diskStorage
// Uncomment this if you want to upload a file 
//const upload = SetupMulter();

// Create an endpoint named load_code_folder
// reachable via http://localhost:<apiPort>/load_code_folder
export function load_code_folderEndpoint(app) {
  // Uncomment this, and rename photo to the files FormDatas name,
  // in the SDK side oth things,
  // if you want to upload a file 
  app.post("/load_code_folder", /*upload.single("photo"),*/ async (req, res) => {
    try {
      await _load_code_folderEndpoint(req, res);

      return;
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occurred while trying to use the load_code_folder endpoint: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
