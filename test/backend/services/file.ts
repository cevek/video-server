import {config} from "../config";
export async function getFileName(id:string) {
    return config.dir + id;
}
