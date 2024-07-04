import fs from "fs";

export function FileExists(path) {
    try {
        // Check if the file exists by attempting to access its stats
        fs.accessSync(path, fs.constants.F_OK);
        return true; // File exists
    } catch (err) {
        return false; // File doesn't exist or access is denied
    }
}
