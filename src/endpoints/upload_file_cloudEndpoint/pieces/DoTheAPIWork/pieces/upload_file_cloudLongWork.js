import { getNPMFolderRoot } from "../../../../../../getNPMFolderRoot.js";
import { AddJobInQueue } from "../../../../../BackgroundWorker/AddJobInQueue.js";
import { GetJobQueue } from "../../../../../BackgroundWorker/GetJobQueue.js";
import { GetFolderForClientData } from "../../../../../services/GetFolderForClientData/GetFolderForClientData.js";
import { GetUniqueID } from "../../../../../services/GetUniqueID/GetUniqueID.js";
import path from "path";
import { OSWork } from "../../../../../services/OSWork/OSWork.js";
import { UploadFileToCloudinary } from "../../../../../services/UploadFileToCloudinary/UploadFileToCloudinary.js";
import { UpdateAPIUsage } from "../../UpdateAPIUsage/UpdateAPIUsage.js";
import { hashAPIKey } from "../../../../../services/GenerateAPIKey/GenerateAPIKey.js";
import { TryParse } from "../../../../../services/TryParse/TryParse.js";


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
  const { resourceType, params } = req.body;

  const paramsObj = TryParse(params);

  // the client file 
  const file = req.file;

  // Check if file exists
  if (!file) {
    return res.status(420).send('No file uploaded.');
  }

  UploadFileToCloudinary({
    params: paramsObj,
    fileBuffer: req.file.buffer,
    resourceType,
    onSuccess: async (data) => {


      console.log(`Upload success !: ${JSON.stringify(data, null, 2)}`);

      // Here you update API usage stuff, if needed
      // If you choose to monetize this API
      const { apiKey } = req.query;
      const hashedAPIKey = hashAPIKey(apiKey);
      const bogusJob = { data: { hashedAPIKey } };
      const record = await UpdateAPIUsage(data, bogusJob);

      // return the final output, the fruit of your labor,
      // the graal, the caviar, the og kush, here you go !
      const output = { answer: data, usage: record };

      res.json(output)
    },
    onError: (e) => {


      console.log(`Upload error !: ${JSON.stringify(e, null, 2)}`);

      res.status(421).send(`Upload failed: ${JSON.stringify(e, null, 2)}`)
    },
  });

  // the client file path
  //const filePath = await GetFilePathFromMulterFilesystem(req);

  //console.log(`req: ${JSON.stringify(req.file, null, 2)}`)

  // the queue
  //let workQueue = GetJobQueue();

  // add id of this job, so we can handle it later
  //const jobId = GetUniqueID(15);


  // the name of the endpoint that's about to add a job in the queue.
  // so we know what work needs to be done in the background
  //const api_endpoint_name = "upload_file_cloud";

  // add a background job in a BullMQ Queue
  /*await AddJobInQueue({
    workQueue,
    jobId,
    api_endpoint_name,
    req,
    res,
    args: {
      resourceType,
      fileBuffer: file.buffer,
    }
  });*/


}

async function GetFilePathFromMulterFilesystem(req) {
  const folderUploadPath = await GetFolderForClientData(req);
  const fileInfo = req.file;


  const filePath = path.join(
    folderUploadPath,
    fileInfo.originalname
  );

  return filePath;
}
