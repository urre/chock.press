import chalk from 'chalk'
import fs from 'fs'
import scrapeIt from 'scrape-it'
import _ from 'lodash'

const sites = [
  "http://www.expressen.se"
  // "http://www.expressen.se/kultur/",
  // "http://www.expressen.se/ledare/",
  // "http://www.expressen.se/noje/",
  // "http://www.expressen.se/halsoliv/",
  // "http://www.expressen.se/kvallsposten",
  // "http://www.expressen.se/noje/eurovision/",
  // "http://www.expressen.se/noje/lets-dance/",
  // "http://www.expressen.se/kultur/ungkultur/"
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
        listItem: '.b-ateaser',
        data: {
          title: '.teaser-component',
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