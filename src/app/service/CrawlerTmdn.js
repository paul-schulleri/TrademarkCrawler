module.exports = class CrawlerTmdn {
    constructor() {
        this.service = require('puppeteer');
        this.searchUrl = 'https://www.tmdn.org/tmview/search-tmv?sidx=tm&q=';
        this.cookieUrl = 'https://www.tmdn.org/consent/cookies.html?referer=/network/';
    }

    async run(data) {
        const browser = await this.service.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ]
        });

        const page = await browser.newPage();
        page._client.send('Network.clearBrowserCookies');
        await page.goto(this.cookieUrl, {waitUntil: 'networkidle2'});
        await page.click('#content a.btn');
        await page.goto(this.searchUrl + require('querystring').escape(data.query), {waitUntil: 'domcontentloaded'});

        let result = await page.evaluate(() => {
            return document.querySelector("body").innerText;
        });

        await browser.close();
        return result;
    }
};