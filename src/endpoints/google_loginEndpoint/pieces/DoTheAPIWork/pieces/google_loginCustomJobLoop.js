import { getGoogleTokens } from "../../../../../services/GoogleLogin/GoogleLogin.js";

/**
 * 
 * @param {*} job 
 * 
 * @returns your own shizzle
 */
export async function google_loginCustomJobLoop(job) {
  /**
   * Some useful info:
   * 
   * - job.data contains the args 
   * you have passed in the google_loginLongWork.js file.
   * 
   * - job.progress() is a method that allows you to save serializable progress data
   * that the user can get using the get_work_status endpoint.
   */

  return new Promise((resolve, reject) => {

    // Example usage:
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const deviceCode = job.data.device_code;
    const interval = job.data.interval * 2; // Replace with the actual interval value
    const maxDuration = job.data.expires_in / 4; // Replace with the maximum duration in seconds

    getGoogleTokens(clientId, clientSecret, deviceCode, interval, maxDuration)
      .then(tokens => {
        if (tokens) {
          resolve(tokens);
        } else {
          throw new Error('Token request failed');
        }
      });
  })

}


