import { DeleteFileFromCloudinary } from "../../../../../services/DeleteFileFromCloudinary/DeleteFileFromCloudinary.js";

/**
 * 
 * @param {*} job 
 * 
 * @returns your own shizzle
 */
export async function delete_file_cloudCustomJobLoop(job) {
  /**
   * Some useful info:
   * 
   * - job.data contains the args 
   * you have passed in the delete_file_cloudLongWork.js file.
   * 
   * - job.progress() is a method that allows you to save serializable progress data
   * that the user can get using the get_work_status endpoint.
   */
  return new Promise((resolve, reject) => {

    DeleteFileFromCloudinary({
      params: job.data.params,
      publicId: job.data.publicId,
      resourceType: job.data.resourceType,
      onSuccess: (data) => {
        resolve(data);
      },
      onError: (e) => {
        reject(e);
      },
    });

  });
}


