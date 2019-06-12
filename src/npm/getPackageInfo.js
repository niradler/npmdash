const rp = require("request-promise");

const getPackageInfo = name => {
  const opt = {
    uri: `${process.env.NPM_API_V2_URL}/v2/package/${name}`,
    json: true,
  };

  return rp(opt);
};

module.exports = getPackageInfo;
