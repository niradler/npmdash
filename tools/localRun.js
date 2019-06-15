const open = require("open");
const execa = require("execa");

const localRun = username => {
  const port = process.env.PORT || 8989;
  let url = `http://localhost:${port}`;
  if (username && typeof username === "string") {
    url = `http://localhost:${port}/npm/dashboard/${username}`;
  }
  open(url).then(() => console.log(`running on http://localhost:${port}`));
  execa
    .shell("npm run start", {
      cwd: __dirname,
      env: process.env
    })
    .then(data => console.log({ data }))
    .catch(error => console.error(error));
};

module.exports = localRun;
