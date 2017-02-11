import fs from 'fs';
import series from 'async-series';
import scrapeExpressen from './helpers/scrapeExpressen';
import scrapeAftonbladet from './helpers/scrapeAftonbladet';

series([(done) => {
  scrapeExpressen();
  done()
}, (done) => {
  scrapeAftonbladet();
  done()
}
], function(err) {})