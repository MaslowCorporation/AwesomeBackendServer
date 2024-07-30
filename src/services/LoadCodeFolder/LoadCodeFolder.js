import axios from "axios";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";

export async function LoadCodeFolder(folderPath, folderId, maslowAPIKey) {

    const loaderJS = new DirectoryLoader(folderPath, {
        ".ts": (path) => new TextLoader(path),
        ".js": (path) => new TextLoader(path),
    });
    const JS_FILES = await loaderJS.load();

    const response = await axios.post(
        `http://localhost:8080/load_code_folder?apiKey=${maslowAPIKey}`,
        {
            JS_FILES,
            userId: folderId,

        }
    );


    return;
}

LoadCodeFolder(
    "C:\\Users\\MaslowPatrick\\Desktop\\MaslowWorld\\MaslowEditor",
    "MaslowEditor",
    "982257da4f5d8660e2bed0d577ada38ed711a82a02c446bd8aaecd8538ead16c"
)
