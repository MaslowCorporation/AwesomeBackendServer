import cloudinary from "cloudinary";
import { RunIfPossible } from "../RunIfPossible/RunIfPossible.js";
import { InitCloudinary } from "../UploadFileToCloudinary/InitCloudinary.js";
import { Constants } from "../../AppConstants/Constants.js";

async function DeleteFileFromCloudinary({
  publicId,
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
