const moment = require("moment");
const _ = require("lodash");
const { getDownloads, getPackageInfo } = require(".");

const url = process.env.NPM_URL;
const puppeteer = require("puppeteer");

const scrap = () => {
  const packagesNodes = document.querySelectorAll("h3.hover-black");
  let packages = [];
  packagesNodes.forEach(n => packages.push(n.innerText));

  return {
    packages
  };
};

const packagesByUsername = async (username = "niradler55") => {
  let res = {};
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto(`${url}/~${username}`);

    const { packages } = await page.evaluate(scrap);

    const data = [];
    for (let i = 0; i < packages.length; i++) {
      const name = packages[i];
      let pkg = { name };

      const downloadsInfo = await getDownloads(name).catch(e => console.log(e));
      pkg.info = await getPackageInfo(name).catch(e => console.log(e));
      if (downloadsInfo) {
        pkg.downloads = downloadsInfo.downloads;
      }
      data.push(pkg);
    }

    const names = data
      .filter(pkg => pkg.info)
      .map(pkg => pkg.name)
      .join();
    const monthly = await getDownloads(
      names,
      moment()
        .subtract(30, "days")
        .format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD")
    ).catch(e => console.log(e));

    res.total = data.reduce(
      (sum, pkg) => (sum = sum + (pkg.downloads ? pkg.downloads : 0)),
      0
    );

    res.packages = packages;

    if (monthly) {
      res.data = data.map(pkg => {
        pkg.monthly = _.get(monthly, `${pkg.name}.downloads`, null);

        return pkg;
      });
    }
  } catch (error) {
    console.log(error);
    res.error = error.message;
  } finally {
    browser.close();
  }

  return res;
};

module.exports = packagesByUsername;
