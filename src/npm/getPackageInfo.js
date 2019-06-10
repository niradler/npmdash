const rp = require("request-promise");

const getPackageInfo = (name, version) => {
  const opt = {
    uri: "https://api.npms.io/v2/package/" + name,
    json: true
  };

  return rp(opt);
};

module.exports = getPackageInfo;
