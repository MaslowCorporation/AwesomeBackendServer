import cloudinary from "cloudinary";
import { RunIfPossible } from "../RunIfPossible/RunIfPossible.js";
import { InitCloudinary } from "../UploadFileToCloudinary/InitCloudinary.js";
import { Constants } from "../../AppConstants/Constants.js";

async function DeleteFileFromCloudinary({
  publicId,
  resourceType,
  onSuccess,
  onError,
  params,
}) {
  try {
    InitCloudinary({
      //cloud_name: process.env.cloudinary_cloud_name,
      //api_key: process.env.cloudinary_api_key,
      //api_secret: process.env.cloudinary_api_secret

      cloud_name: params?.cloudName,
      api_key: params?.cloudinaryAPIKey,
      api_secret: params?.cloudinaryAPISecret
    });

    const response = await cloudinary.v2.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true,
    });

    RunIfPossible({ func: onSuccess, args: response });

    return response;
  } catch (error) {
    RunIfPossible({ func: onError, args: error });

    return;
  }
}



export { DeleteFileFromCloudinary };
