import { getNPMFolderRoot } from "../../../../../../getNPMFolderRoot.js";
import { AddJobInQueue } from "../../../../../BackgroundWorker/AddJobInQueue.js";
import { GetJobQueue } from "../../../../../BackgroundWorker/GetJobQueue.js";
import { GetFolderForClientData } from "../../../../../services/GetFolderForClientData/GetFolderForClientData.js";
import { GetUniqueID } from "../../../../../services/GetUniqueID/GetUniqueID.js";
import path from "path";

export async function upload_file_cloudLongWork(req, res) {
  

  // the data passed by the API client.
  //
  // If you use Postman, the args are passed in the body of the HTTP request,
  // with form-data chosen as the body type.
  //
  // If you use a programming language, it's the same deal.
  // The args are passed in the body of the HTTP request, 
  // as a FormData (or whatever the name is for your own language)
  //
  // Give 2 args: a "cloud_file" file, and a "resourceType" string. 
  // the cloudinary resource types are:
  //
  // - image (including animated images, PDFs and 3d models). For supported file formats, see Supported image formats and Uploading 3D models.
  //
  // - video: All video and audio files For supported file formats, see Supported video formats and Supported audio formats.
  //
  // raw (any other file type)
  const { resourceType } = req.body;

  // the client file 
  const file = req.file;

  //console.log(`req: ${JSON.stringify(req.file, null, 2)}`)

  // the queue
  let workQueue = GetJobQueue();


  // add id of this job, so we can handle it later
  const jobId = GetUniqueID(15);

  // the name of the endpoint that's about to add a job in the queue.
  // so we know what work needs to be done in the background
  const api_endpoint_name = "upload_file_cloud";

  // add a background job in a BullMQ Queue
  await AddJobInQueue({
    workQueue,
    jobId,
    api_endpoint_name,
    req,
    res,
    args: {
      resourceType,
      file
    }
  });

  
}
