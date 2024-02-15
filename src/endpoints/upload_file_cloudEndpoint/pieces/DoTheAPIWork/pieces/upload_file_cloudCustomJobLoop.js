import { Constants } from "../../../../../AppConstants/Constants.js";
import { InitCloudinary } from "../../../../../services/UploadFileToCloudinary/InitCloudinary.js";
import { UploadFileToCloudinary } from "../../../../../services/UploadFileToCloudinary/UploadFileToCloudinary.js";
import { DeleteClientFile } from "./DeleteClientFile.js";
import cloudinary from "cloudinary";
import streamifier from "streamifier";

/**
 * 
 * @param {*} job 
 * 
 * @returns your own shizzle
 */
export async function upload_file_cloudCustomJobLoop(job) {
  /**
   * Some useful info:
   * 
   * - job.data contains the args 
   * you have passed in the upload_file_cloudLongWork.js file.
   * 
   * - job.progress() is a method that allows you to save serializable progress data
   * that the user can get using the get_work_status endpoint.
   */
  

  const uploadPreset = process.env.cloudinary_upload_preset;

  return new Promise((resolve, reject) => {
    UploadFileToCloudinary({
      fileBuffer: job.data.fileBuffer,
      uploadPreset,
      resourceType: job.data.resourceType,
      onSuccess: async (data) => {
        

        console.log(`Upload success !: ${JSON.stringify(data, null, 2)}`);
        
        //DeleteClientFile(job.data.filePath);

        resolve(data);
      },
      onError: (e) => {
        

        console.log(`Upload error !: ${JSON.stringify(e, null, 2)}`);

        //DeleteClientFile(job.data.filePath);

        reject(e);
      },
    });

  });

}


