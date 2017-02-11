import chalk from 'chalk'
import fs from 'fs'
import scrapeIt from 'scrape-it'

const sites = [
  "http://www.expressen.se",
  "http://www.expressen.se/kultur/",
  "http://www.expressen.se/ledare/",
  "http://www.expressen.se/noje/",
  "http://www.expressen.se/kvallsposten"
];

Array.prototype.delayedForEach = function(callback, timeout, thisArg) {
  var i = 0,
    l = this.length,
    self = this,
    caller = function() {
      callback.call(thisArg || self, self[i], i, self);
      (++i < l) && setTimeout(caller, timeout);
    };
  caller();
};

const scrapeExpressen = () => {

  sites.delayedForEach((urls, index) => {

    scrapeIt(urls, {
      articles: {
        listItem: 'article',
        data: {
          title: 'h2',
          url: {
            selector: 'a',
            attr: 'href'
          }
        }
      }

    }).then(page => {
      // console.log(page);
      fs.writeFileSync('../../src/data/expressen.json', JSON.stringify(page), 'utf-8');
    });


  }, 2000);

}

export default scrapeExpressen;