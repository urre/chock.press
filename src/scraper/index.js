import fs from 'fs';

import series from 'async-series';
import match from './helpers/match';
import scrapeTitles from './helpers/scrapetitles';

series([(done) => {
  scrapeTitles();
  done()
}, (done) => {
  match('aftonbladet');
  done()
}, (done) => {
  match('expressen');
  done()
}
], function(err) {})
