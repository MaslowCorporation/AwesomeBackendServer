import fs from "fs";
import iconv from "iconv-lite";
import jschardet from "jschardet";

function GetFileContentsIfExisting(filePath) {
  try {

    // Read the file buffer
    const fileBuffer = fs.readFileSync(filePath);

    // Detect the encoding
    const detectedEncoding = jschardet.detect(fileBuffer);

    if (detectedEncoding && detectedEncoding.encoding) {
      const originalEncoding = detectedEncoding.encoding;
      //console.log(`Detected encoding: ${originalEncoding}`);

      // Convert the buffer to a UTF-8 encoded string
      const utf8EncodedString = iconv.decode(fileBuffer, originalEncoding);

      return utf8EncodedString; // Return the content as a string
    } else {
      //console.log('Unable to detect encoding.');
      return null;
    }
  } catch (err) {
    //console.error('Error reading file:', err);
    return null;
  }
}

export { GetFileContentsIfExisting };
