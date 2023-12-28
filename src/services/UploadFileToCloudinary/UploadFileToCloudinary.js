import cloudinary from "cloudinary";
import { RunIfPossible } from "../RunIfPossible/RunIfPossible.js";
import { InitCloudinary } from "./InitCloudinary.js";
import { Constants } from "../../AppConstants/Constants.js";
//import fs from "fs";
import DatauriParser from "datauri/parser.js";
import path from "path";

async function UploadFileToCloudinary({
  fileData,
  resourceType,
  onSuccess,
  onError,
}) {
  try {

    InitCloudinary({
      cloud_name: Constants.cloudinary_cloud_name,
      api_key: Constants.cloudinary_api_key,
      api_secret: Constants.cloudinary_api_secret
    });

    
    const parser = new DatauriParser();

    const buffer = fileData.buffer;

    const data = parser.format(path.extname(fileData.originalname), buffer); //=> "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."

    console.log(`upload data string: ${data.content}`);


    const response = await cloudinary.v2.uploader.upload(data.content, {
      resource_type: resourceType,
    });


    // run the success callback
    RunIfPossible({ func: onSuccess, args: response });

    return response;
    
  } catch (error) {
 

    RunIfPossible({ func: onError, args: error });

    return;
  }
}

export { UploadFileToCloudinary };
