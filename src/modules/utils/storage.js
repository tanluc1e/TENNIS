import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (dest, name) => {
  return multer.diskStorage({
    destination: (req, file, callback) => {
      const directory = path.resolve(
        __dirname,
        "..",
        "..",
        "..",
        "public",
        dest
      );
      callback(null, directory);
    },
    filename: (req, file, callback) => {
      callback(null, name + "_" + Date.now() + path.extname(file.originalname));
    },
  });
};
