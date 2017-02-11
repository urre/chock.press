import chalk from 'chalk'
import fs from 'fs'
import scrapeIt from 'scrape-it'

const sites = [
  "http://www.aftonbladet.se/",
  "http://www.aftonbladet.se/nojesbladet/",
  "http://www.aftonbladet.se/relationer",
  "http://www.aftonbladet.se/tagg/66ee63ad-5d18-4fe4-b2e1-7fcbd9adbc95",
  "http://www.aftonbladet.se/nojesbladet/idol/"
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

const scrapeAftonbladet = () => {

  sites.delayedForEach((urls, index) => {


    scrapeIt(urls, {
      articles: {
        listItem: '.abItemHLine',
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
      fs.writeFileSync('../../src/data/aftonbladet.json', JSON.stringify(page), 'utf-8');
    });

  }, 5000);

}

export default scrapeAftonbladet;