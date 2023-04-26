// import Head from "next/head";
// import styles from "@/styles/Home.module.css";
import React, { useState, useEffect } from "react";
import { ChonkyIconFA } from "chonky-icon-fontawesome";
import { FullFileBrowser, ChonkyActions, setChonkyDefaults } from "chonky";
import folderSearch from "./folderSearch";
import handleAction from "./chonkyActionHandler";

export default function Home({ results }) {
  console.log("results", results);
  // const finalData = getData();
  // console.log("finalData", finalData);
  const [currentFolder, setCurrentFolder] = useState("0");
  const [files, setFiles] = useState(null);
  const [folderChain, setFolderChain] = useState(null);
  const [list, setList] = useState(results);

  // useEffect(() => {
  //   setList(results);
  //
  // }, []);
  console.log("list", list);
  const handleActionWrapper = (data) => {
    handleAction(data, setCurrentFolder, list);
  };

  setChonkyDefaults({ iconComponent: ChonkyIconFA });

  useEffect(() => {
    let folderChainTemp = [];
    let filesTemp = [];

    const [found, filesTemp1, folderChainTemp1] = folderSearch(
      list,
      folderChainTemp,
      currentFolder
    );
    if (found) {
      console.log("found", filesTemp1, folderChainTemp1);
      filesTemp = filesTemp1;
      folderChainTemp = folderChainTemp1;
    }

    console.log("files", filesTemp);
    console.log("folders", folderChainTemp);
    setFolderChain(folderChainTemp);
    setFiles(filesTemp);
  }, [currentFolder]);

  useEffect(() => {
    setInterval(() => setList(results), 5000);
  }, []);

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
  console.log("hello from server side");
  const API_KEY = process.env.API_KEY;

  const res = await fetch("https://dev.test.sega.co.uk/api/list", {
    headers: {
      "x-secret-api-key": API_KEY,
    },
  });
  const data = await res.json();
  console.log("data", data);

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

  const finalData = [
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

  return {
    props: { results: finalData },
  };
}

// export const fetchData = async () => {
//   console.log("hello from server side");
//   const API_KEY = "SeuYdrleiKPL2RG52s3eYTMxwHafn4gl";
//   console.log("apikey", API_KEY);
//   const res = await fetch("https://dev.test.sega.co.uk/api/list", {
//     method: "GET",
//     mode: "no-cors",
//     headers: {
//       "x-secret-api-key": API_KEY,
//     },
//   });
//   const data = await res.json();
//   console.log("data", data);

//   const findChildren = (listing, parent) => {
//     const children = listing.filter((list) => list.parent === parent);

//     if (children.length === 0) {
//       return [];
//     }

//     return children.map((child) => {
//       return {
//         id: child.id,
//         name: child.name,
//         isDir: child.type === "folder",
//         files: findChildren(listing, child.id),
//       };
//     });
//   };

//   const finalData = [
//     {
//       id: "0",
//       name: "Root",
//       isDir: true,
//       files: data
//         .filter((final) => !final.parent)
//         .map((final) => {
//           return {
//             id: final.id,
//             name: final.name,
//             isDir: true,
//             files: findChildren(data, final.id),
//           };
//         }),
//     },
//   ];

//   return finalData;
// };

//1-loglari sil
//commentler
//calismayan funclaris sil
//test?
//readme
