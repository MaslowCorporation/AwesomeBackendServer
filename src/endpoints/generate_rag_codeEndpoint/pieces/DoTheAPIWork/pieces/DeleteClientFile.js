import fs from "fs";

export function DeleteClientFile(filePath) {
  fs.rm(filePath, () => {

  });
}
