import { _generate_rag_codeEndpoint } from "./pieces/_generate_rag_codeEndpoint/_generate_rag_codeEndpoint.js";

// Uncomment this if you want to upload a file 
//import { SetupMulter } from "./pieces/SetupMulter/SetupMulter.js";

// Set up Multer storage using diskStorage
// Uncomment this if you want to upload a file 
//const upload = SetupMulter();

// Create an endpoint named generate_rag_code
// reachable via http://localhost:<apiPort>/generate_rag_code
export function generate_rag_codeEndpoint(app) {
  // Uncomment this, and rename photo to the files FormDatas name,
  // in the SDK side oth things,
  // if you want to upload a file 
  app.post("/generate_rag_code", /*upload.single("photo"),*/ async (req, res) => {
    try {
      await _generate_rag_codeEndpoint(req, res);

      return;
    } catch (error) {
      res
        .status(400)
        .send(
          "A problem occurred while trying to use the generate_rag_code endpoint: " +
          JSON.stringify(error, null, 2)
        );

      return;
    }
  });
}
