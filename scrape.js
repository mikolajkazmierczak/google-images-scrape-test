import Scraper from "images-scraper";
import fs from "fs";
import fetch from "node-fetch";

// config
const path = "./data";
const scrapes = [
  ["cooking", 70],
  ["city road side", 70],
  ["person photo", 30],
  ["unlit candle", 50],
  ["car on road", 70],
  ["forest", 20],
];

if (!fs.existsSync(path)) fs.mkdirSync(path);
const scraperConfig = { puppeteer: { headless: true } };

let sum = scrapes.reduce((part, scrape) => part + scrape[1], 0);
let count = 0;

scrapes.forEach(async (scrape) => {
  let results;
  let tries = 0;
  while (true) {
    try {
      results = await new Scraper(scraperConfig).scrape(...scrape);
      break;
    } catch (err) {
      console.log("Oops! Trying again...");
      tries++;
      if (tries > 3) console.log(`'${scrape[0]}' scraping has failed!`);
    }
  }
  const urls = results.map((result) => result.url);
  console.log(scrape[0]);
  let i = 0;
  urls.forEach((url) => {
    fetch(url).then(async (res) => {
      const buffer = await res.buffer();
      fs.writeFile(`${path}/${++count}.jpg`, buffer, () => {
        console.log(scrape[0], ++i, count, url);
        if (count === sum) console.log("Finished!");
      });
    });
  });
});
