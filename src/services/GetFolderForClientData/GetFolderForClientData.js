import { OSWork } from "../OSWork/OSWork.js";
import fs from "fs";

export async function GetFolderForClientData(req) {
  const { apiKey } = req.query;

  const uploadPathUnix = `/tmp/files/${apiKey || "trashcan"}`; 
  const uploadPathWindows = `./files/${apiKey || "trashcan"}`; 

  const uploadPath = await OSWork({
    onWindows: () => uploadPathWindows,
    onLinux: () => uploadPathUnix,
    onMacOS: () => uploadPathUnix,
  });
  

  return uploadPath;
}

export function GetClientAPIKey(req) {
  const { apiKey } = req.query;

  return apiKey || null;
}
