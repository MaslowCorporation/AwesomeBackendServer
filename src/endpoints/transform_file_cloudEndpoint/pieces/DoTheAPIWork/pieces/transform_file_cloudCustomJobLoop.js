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
      params: job.data.params,
      first_asset_id_ext: job.data.first_asset_id_ext,
      transforms: JSON.parse(job.data.transforms),


      onSuccess: (data) => {

        resolve(data);
      },
      onError: (e) => {

        reject(e);
      },
    });

  });


}


