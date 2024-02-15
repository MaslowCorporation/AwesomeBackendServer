import { hashAPIKey } from "../services/GenerateAPIKey/GenerateAPIKey.js";

export async function AddJobInQueue({
  workQueue, 
  jobId, 
  api_endpoint_name, 
  req, 
  res, 
  args,
  quickResponseArgs,
}) {
  
  
  // the API Key present in the 'apiKey' query parameter.
  // of the request URL.
  const { apiKey } = req.query;

   // If an API key has been given by the user,
  // encode the API key given by the user,
  // then see if it exists in the API Key database.
  const hashedAPIKey = apiKey && hashAPIKey(apiKey);

  // Docs: https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md
  let job = await workQueue.add(
    // this contains the input data of the job.
    // Whatever args you pass here will be available in
    // job.data , when you access the job later.
    // here you can add the inputs of the background work.
    // on the background side, you can access this objet using job.data
    {
      ...args,

      // the api_endpoint_name property 
      // allows the background worker to know what work to do
      //
      // The creation_time_unix is a timestamp, a date of birth of the job
      //
      // DONT EDIT OR REMOVE THESE PROPERTIES !!!
      // This is important shizzle !!!!
      api_endpoint_name,
      creation_time_unix: Date.now(),
      hashedAPIKey,
      job_executed: false,
    },
    // here you can set options for this shizzle.
    {
      jobId: jobId,
    }
  );

  res.json({ ...quickResponseArgs, id: job.id });

  return jobId;
}
