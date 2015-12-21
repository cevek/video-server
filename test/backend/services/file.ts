import {config} from "../config";
import {mediaFilesDAO} from "../models/media-file";
export async function getFileName(id:string) {
    var row = await mediaFilesDAO.findById(id);
    return row.filename;
}
