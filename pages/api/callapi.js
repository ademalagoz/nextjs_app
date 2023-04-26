export default async function getServerSideProps() {
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
  console.log("finalData", finalData);
  return {
    props: { results: finalData },
  };
}
