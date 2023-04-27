import { ChonkyActions } from "chonky";
import { findFile } from "./folderSearch";

const handleAction = (data, setCurrentFolder, results) => {
  if (data.id === ChonkyActions.OpenFiles.id) {
    const file = findFile(results, data.payload.files[0].id);
    if (file?.isDir) {
      setCurrentFolder(file.id);
    }
  }
};

export default handleAction;
