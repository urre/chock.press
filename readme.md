## [Chockpress](https://chockpress.now.sh)

Having fun with Swedish evening news. The latest shocking headlines from Aftonbladet and Expressen.

### Scraping and matching

    yarn run scrape

For scraping and matching news headings.

### Run

    yarn run develop

Starts Webpack dev server at [localhost:8080](http://localhost:8080).

### Build for production

    yarn run build

### Release (scrape, build and deploy)

    yarn run release

### Deployment

Circle CI will automatically build, scrape and deploy this website everyday at 15.00

[![CircleCI](https://circleci.com/gh/urre/chock.press.svg?style=svg)](https://circleci.com/gh/urre/chock.press)

---

Visit [Chockpress](https://chockpress.now.sh/)
