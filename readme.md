## [Chockpress](https://chockpress.now.sh)

![](https://res.cloudinary.com/urre/image/upload/v1523543987/ubzm69mfxy8lswlaagwp.png)

Having fun with Swedish evening news. The latest shocking headlines from Aftonbladet and Expressen.

### Scraping and matching

    yarn run scrape

For scraping and matching news headings.

### Run

    yarn run develop

Starts Webpack dev server at [localhost:8080](http://localhost:8080).

### Build for production

    yarn run build

### Publish (scrape, build and deploy)

    yarn run publish

### Deploy

    yarn run deploy

---

### Details

* Scraper: Built using Node.js
* Website: Built using React.js
* Tooling: Webpack, Yarn, Babel
* Database: Using Google Drive API to store headlines in a spreadsheet, for future use.
* Hosted on [Now](https://zeit.co/now)

Visit [Chockpress](https://chockpress.now.sh/)
