import { ChonkyActions } from "chonky";
import { findFile } from "./folderSearch";
//import fileData from "./dataapi.js";

const handleAction = (data, setCurrentFolder, list) => {
  console.log("handle", data);
  if (data.id === ChonkyActions.OpenFiles.id) {
    console.log("open files", data.payload.files[0].id);
    const file = findFile(list, data.payload.files[0].id);
    console.log("list", list);
    console.log("file", file);
    if (file?.isDir) {
      console.log("fileid", file.id);
      setCurrentFolder(file.id);
    }
  }
};

export default handleAction;
