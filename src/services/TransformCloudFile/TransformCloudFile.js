import { RunIfPossible } from "../RunIfPossible/RunIfPossible.js";
import cloudinary from "cloudinary";
import { InitCloudinary } from "../UploadFileToCloudinary/InitCloudinary.js";
import { Constants } from "../../AppConstants/Constants.js";


/**
 * This function is used to make Cloudinary transforms on an uploaded file
 * Cloudinary is a cloud service that offers a solution to a web application's entire image management pipeline
 * 
 * @param first_asset_id_ext, the public id with file extension of the first asset used in the transform
 * @param transforms - An array of objects of transformations to apply to the file
 * @param onSuccess - A callback function that handles successful transformations
 * @param onError - A callback function that handles any errors that occur during transformations
 * @param print - log or no
 * 
 * Crée une url de transform pour cet asset cloud.
 * 
 * Une url de format 
 * 
 * https://res.cloudinary.com/<cloud_name>/<asset_type>/<delivery_type>/<transformations>/<version>/<public_id_full_path>.<extension>
 * 
 * + d'infos ici:
 * 
 * 
 */
export async function TransformCloudFile({
    first_asset_id_ext,
    transforms,
    onSuccess,
    onError,
    print = true,
    params,
}) {
    try {
        // 

        InitCloudinary({
            //cloud_name: process.env.cloudinary_cloud_name,
            //api_key: process.env.cloudinary_api_key,
            //api_secret: process.env.cloudinary_api_secret

            cloud_name: params?.cloudName,
            api_key: params?.cloudinaryAPIKey,
            api_secret: params?.cloudinaryAPISecret
        });

        let result = cloudinary.url(first_asset_id_ext, transforms);

        RunIfPossible({ func: onSuccess, args: result });

        return result
    } catch (error) {
        RunIfPossible({ func: onError, args: error });

        return null
    }
}


