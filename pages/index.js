import React, { useState, useEffect } from "react";
import { ChonkyIconFA } from "chonky-icon-fontawesome";
import { FullFileBrowser, ChonkyActions, setChonkyDefaults } from "chonky";
import folderSearch from "./folderSearch";
import handleAction from "./chonkyActionHandler";

export default function Home({ results }) {
  const [currentFolder, setCurrentFolder] = useState("0");
  const [files, setFiles] = useState(null);
  const [folderChain, setFolderChain] = useState(null);

  const handleActionWrapper = (data) => {
    handleAction(data, setCurrentFolder, results);
  };

  setChonkyDefaults({ iconComponent: ChonkyIconFA });

  useEffect(() => {
    let folderChainTemp = [];
    let filesTemp = [];

    const [found, filesTemp1, folderChainTemp1] = folderSearch(
      results,
      folderChainTemp,
      currentFolder
    );
    if (found) {
      filesTemp = filesTemp1;
      folderChainTemp = folderChainTemp1;
    }

    setFolderChain(folderChainTemp);
    setFiles(filesTemp);
  }, [currentFolder]);

  return (
    <div className="App" style={{ width: 950, height: 900 }}>
      <h1>File Explorer</h1>
      {
        <FullFileBrowser
          files={files}
          folderChain={folderChain}
          defaultFileViewActionId={ChonkyActions.EnableListView.id}
          onFileAction={handleActionWrapper}
          disableDefaultFileActions={true}
        />
      }
    </div>
  );
}

export async function getServerSideProps() {
  const API_KEY = process.env.API_KEY;

  async function fetchData() {
    const res = await fetch("https://dev.test.sega.co.uk/api/list", {
      headers: {
        "x-secret-api-key": API_KEY,
      },
    });
    const data = await res.json();

    const findChildren = (listing, parent) => {
      const children = listing.filter((list) => list.parent === parent);

      if (children.length === 0) {
        return [];
      }

      return children.map((child) => {
        return {
          id: child.id,
          name: child.name,
          isDir: child.type === "folder",
          files: findChildren(listing, child.id),
        };
      });
    };

    const chonkyData = [
      {
        id: "0",
        name: "Root",
        isDir: true,
        files: data
          .filter((final) => !final.parent)
          .map((final) => {
            return {
              id: final.id,
              name: final.name,
              isDir: true,
              files: findChildren(data, final.id),
            };
          }),
      },
    ];

    return chonkyData;
  }

  const finalData = await fetchData();
  return {
    props: { results: finalData },
  };
}
