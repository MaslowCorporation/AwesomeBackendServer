import { TransformCloudFile } from "../../../../../services/TransformCloudFile/TransformCloudFile.js";






/**
 * 
 * @param {*} job 
 * 
 * @returns your own shizzle
 */
export async function transform_file_cloudCustomJobLoop(job) {
  /**
   * Some useful info:
   * 
   * - job.data contains the args 
   * you have passed in the transform_file_cloudLongWork.js file.
   * 
   * - job.progress() is a method that allows you to save serializable progress data
   * that the user can get using the get_work_status endpoint.
   */


  return new Promise((resolve, reject) => {
    // 

    TransformCloudFile({
      publicId: job.data.publicId,
      transformations: job.data.transformations,
      deliveryType: job.data.deliveryType,
      assetType: job.data.assetType,
      version: job.data.version,
      fileExtension: job.data.fileExtension,

      onSuccess: (data) => {

        resolve(data);
      },
      onError: (e) => {

        reject(e);
      },
    });

  });


}


