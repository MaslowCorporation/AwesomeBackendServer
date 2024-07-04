import multer from "multer";
import fs from "fs";
import { GetFolderForClientData } from '../../../../services/GetFolderForClientData/GetFolderForClientData.js';

export function SetupMulter() {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'files/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  const upload = multer({ storage });
  return upload;
}

export function SetupMulterMemory() {
  const storage = multer.memoryStorage();

  const upload = multer({
    storage,
    //limits: {fileSize: 500000, files: 1}
   })

  return upload;
}

