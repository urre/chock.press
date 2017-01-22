import chalk from 'chalk';
import Xray from 'x-ray';
import fs from 'fs';
const x = Xray();

const sites = [
  'http://www.aftonbladet.se/',
  'http://www.aftonbladet.se/nojesbladet/',
  'http://www.aftonbladet.se/relationer',
  'http://www.aftonbladet.se/tagg/66ee63ad-5d18-4fe4-b2e1-7fcbd9adbc95',
  'http://www.aftonbladet.se/nojesbladet/idol/',
  'http://www.expressen.se',
  'http://www.expressen.se/noje/',
  'http://www.expressen.se/kvallsposten',
  'http://www.expressen.se/halsoliv/sex--relationer/',
  'http://www.expressen.se/halsoliv/skonhet-1/'
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

const scrapeTitles = () => {

  sites.delayedForEach((urls, index) => {
    x(urls, 'a', [{
      title: '',
      url: '@href',
    }])(function(err, obj) {
      if (urls.includes('aftonbladet')) {
        fs.writeFileSync('../../src/data/aftonbladet.json', JSON.stringify(obj), 'utf-8');
      } else {
        fs.writeFileSync('../../src/data/expressen.json', JSON.stringify(obj), 'utf-8');
      }

    })
  }, 2000)

}

export default scrapeTitles;