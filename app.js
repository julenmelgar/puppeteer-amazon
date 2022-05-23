// load puppeteer
const puppeteer = require('puppeteer');
const fs = require('fs');
const domain = "https://www.amazon.es";

// IIFE
(async () => {
  // wrapper to catch errors
  try {
    // create a new browser instance
    const browser = await puppeteer.launch({
      headless: true,
    });

    // create a page inside the browser;
    const page = await browser.newPage();

    // navigate to a website and set the viewport
    await page.setViewport({
      width: 1280,
      height: 800
    });

    await page.goto(domain, {
      waitUntil: 'networkidle2'
    });

    // accept cookies

    try {
      await page.waitForSelector('#sp-cc');
      await page.click('#sp-cc-accept');
    } catch (error) {
      console.log('No cookies');
    }

    // search and wait the product list
    await page.type('#twotabsearchtextbox', 'iphone x 64gb');
    await page.click('#nav-search-submit-button');
    await page.waitForSelector('.s-image');

    // create a screenshots
    await page.screenshot({
      path: 'screenshot/search-iphone-x.png'
    });

    const products = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('.s-result-item.sg-col-4-of-12'));

      return links.map(link => {
        if (link.querySelector(".a-price-whole")) {

          return {
            name: link.querySelector("h2").textContent,
            url: link.querySelector(".a-link-normal.a-text-normal").href,
            image: link.querySelector(".s-image").src,
            price: parseFloat(link.querySelector(".a-price-whole").textContent.replace(/[,.]/g, m => (m === ',' ? '.' : ''))),
          };
        }
      }).slice(0, 5);
    });

    console.log(products.sort((a, b) => {
      return a.price - b.price;
    }));

    fs.writeFileSync('products.json', JSON.stringify(products.sort((a, b) => {
      return a.price - b.price;
    }), null, 2));

    // close the browser
    await browser.close();

  } catch (error) {
    // display errors
    console.log(error);
  }

})();