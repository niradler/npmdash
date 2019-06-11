const rp = require("request-promise");

const getDownloads = (name, from = "1900-01-01", to = "3000-01-01") => {
  const opt = {
    uri: `${process.env.NPM_API_URL}/downloads/point/${from}:${to}/${name}`,
    json: true
  };

  return rp(opt);
};

module.exports = getDownloads;
