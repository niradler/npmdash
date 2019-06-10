require("dotenv").config();
const { getDownloads, getPackageInfo } = require("./npm");
const username = "niradler55";
const url = "https://www.npmjs.com/~" + username;
const puppeteer = require("puppeteer");

const scrap = () => {
  const packagesNodes = document.querySelectorAll("h3.hover-black");
  let packages = [];
  packagesNodes.forEach(n => packages.push(n.innerText));

  return {
    packages
  };
};

(async () => {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto(url);

    const { packages } = await page.evaluate(scrap);
    let total = 0;
    for (let i = 0; i < packages.length; i++) {
      const name = packages[i];
      let count = 0;
      const downloadsInfo = await getDownloads(name).catch(e => console.log(e));
      if (downloadsInfo) {
        count = downloadsInfo.downloads;
        total += count;
      }
    }

    console.log({ total });
  } catch (error) {
    console.log(error);
  } finally {
    browser.close();
  }
})();
