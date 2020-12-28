## [Chockpress →](https://chockpress.urre.vercel.app)

[![CircleCI](https://circleci.com/gh/urre/chock.press.svg?style=svg)](https://circleci.com/gh/urre/chock.press)

Having fun with Swedish evening news. The latest shocking headlines from Aftonbladet and Expressen.

### Scraping and matching

    npm run scrape

For scraping and matching news headings.

### Run

    npm run develop

Starts Webpack dev server at [localhost:8080](http://localhost:8080).

### Build for production

    npm run build

### Deployment

Circle CI will automatically build, scrape and deploy this website everyday at 14.00

### Deploy manually

    npx vercel --prod

---
