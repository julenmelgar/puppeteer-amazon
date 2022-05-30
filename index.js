const puppeteer = require('puppeteer');
const domain = "https://getbootstrap.com/docs/4.0/examples/checkout/";

(async () => {
    try {

        // create a new browser instance
        const browser = await puppeteer.launch({
            headless: false,
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

        // await page.waitForSelector('.needs-validation');

        // // Input text
        // await page.type('.needs-validation #firstName', 'Julen');
        // // Wait 2 seconds
        // await page.waitForTimeout(2000);
        // // Input select
        // await page.select('.needs-validation #country', 'United States');
        // // Input checkbox
        // await page.click('.needs-validation #same-address');
        // // Input radio
        // await page.click('.needs-validation #paypal');
        // // Wait 2 seconds
        // await page.waitForTimeout(2000);
        // // Button click
        // await page.click('.needs-validation .btn');

        // // close the browser
        // await browser.close();

    } catch (error) {
        console.log(error);
    }
})();