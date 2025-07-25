import DataUriParser from "datauri/parser.js"
import path from "path";

const getDataUri = (file) => {
    // console.log("Data URI:", file)
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
}
export default getDataUri;
