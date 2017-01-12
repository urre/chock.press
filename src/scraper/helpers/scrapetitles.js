import chalk from 'chalk';
import Xray from 'x-ray';
import fs from 'fs';
const x = Xray();

const sites = [
  'https://aftonbladet.se',
  'http://www.expressen.se'
];

const scrapeTitles = () => {

  sites.forEach((urls, index) => {
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
  })

}

export default scrapeTitles;