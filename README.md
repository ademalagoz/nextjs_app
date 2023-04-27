# **About Programme**

This application is a file or folder explorer/
The web app would render a file explorer ui, with a hierarchical tree of folders which would allow the user to expand/collapse individual branches and view folder contents.

# **Technologies**

Language: JavaScript
Front-End Framework: React-NextJS
Library: Chonky
Version Control: Git/Github
Deployment: Vercel

# **Tasks**

- Create Index, Search and chonkyActionHandler files in React and Nextjs.
- Fetch the external data from API using the asynchronous function to fetch the data used with the secret key in the local environment.
- Install, revised and implement the Chonky library.
- Create a Nextjs Server Side Rendering getServerSideProps function.
- Create callback functions in order to get convert the data types using (map.(), filter.(),slice() and destructor array methods.
- Use React Hooks useState to store data and state, props for transferring, and useEffect to trigger the data.

# **Challenges**

- App must be created in Nextjs Server Side Rendering getServerSideProps function.
- The api key has 6 call limit per minute.
- The most important thing is that we have to convert the incoming data to Chonky library demand data.
  -In some cases, some of the parent files have so many children files inside them.

# **Solution**

- In this task, we used the ` https://dev.test.sega.co.uk/api/list` api for fetching with a secret api key.
- Created a handleSubmit function to use our using with Async/Await fetching api, filtering, and getting the solution.
- We need to think about some delays when we fetch the api for the latency.
- Created a callback function in order to convert the data for Chonky library requirements.
- Used React Hooks useEffect, useState.
- Finally, get the data and put the data into the Chonky library.
- Deployed on Vercel link: https://adem-nextjs.vercel.app/ and source code is here: https://github.com/ademalagoz/nextjs_app.

# **How to Use This Application**

- Open the code and find the correct directory using with cd.. or cd .\file-explorer\, etc.
- Run the command `npm run dev` in the terminal.
- Open [http://localhost:3000] to view it in your browser.
- Click any folder on the root area and the same for other folders and files.
- You can see on the app how many items and you can select them.
- The page will reload with new folders and files when you refresh the page from the Rest Api.
- If you want to search any folder or files you can use the search button on the left side.
- To learn more about Next.js, take a look at the following resources [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API. [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
