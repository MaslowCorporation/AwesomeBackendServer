import cloudinary from "cloudinary";
import { RunIfPossible } from "../RunIfPossible/RunIfPossible.js";
import { InitCloudinary } from "./InitCloudinary.js";
import { Constants } from "../../AppConstants/Constants.js";
//import fs from "fs";
import DatauriParser from "datauri/parser.js";
import path from "path";
import streamifier from 'streamifier'
import { FileExists } from "../FileExists/FileExists.js";

async function UploadFileToCloudinary({
  filePath,
  fileBuffer,
  resourceType,
  onSuccess,
  onError,
  params,
}) {
  try {


    /*
    const folderName = path.dirname(filePath);
    const grandFolderName = path.dirname(folderName);
    const grandGrandFolderName = path.dirname(grandFolderName);

    console.log(`file ${filePath} exists ? ${FileExists(filePath)}`)
    console.log(`folder ${folderName} exists ? ${FileExists(folderName)}`)
    console.log(`folder ${grandFolderName} exists ? ${FileExists(grandFolderName)}`)
    console.log(`folder ${grandGrandFolderName} exists ? ${FileExists(grandGrandFolderName)}`)
    */

    InitCloudinary({
      //cloud_name: process.env.cloudinary_cloud_name,
      //api_key: process.env.cloudinary_api_key,
      //api_secret: process.env.cloudinary_api_secret
      cloud_name: params?.cloudName,
      api_key: params?.cloudinaryAPIKey,
      api_secret: params?.cloudinaryAPISecret
    });

    let response;

    if (filePath) {
      response = await UploadFileFromPath(filePath, resourceType);
    } else if (fileBuffer) {
      response = await UploadFileFromBuffer(fileBuffer, resourceType)
    } else {
      throw new Error(`Invalid file data: file path = ${filePath}, file buffer = ${fileBuffer}`)
    }


    // run the success callback
    RunIfPossible({ func: onSuccess, args: response });

    return response;

  } catch (error) {


    RunIfPossible({ func: onError, args: error });

    return;
  }
}

async function UploadFileFromPath(filePath, resourceType) {
  return await cloudinary.v2.uploader.upload(filePath, {
    resource_type: resourceType,
  });
}

async function UploadFileFromBuffer(fileBuffer, resourceType) {
  return new Promise((resolve, reject) => {


    let cld_upload_stream = cloudinary.v2.uploader.upload_stream(
      {
        //folder: "uploads",
        resource_type: resourceType,
      },
      (error, result) => {



        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );



    // eslint-disable-next-line no-undef
    //const fileBufferRealDeal = Buffer.from(fileBuffer);

    streamifier.createReadStream(fileBuffer).pipe(cld_upload_stream);
  });
}

export { UploadFileToCloudinary };


