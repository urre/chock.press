const fs = require('fs');
const _ = require('lodash');

import clean from './clean';
import words from './../../data/words.json';
import aftonbladet from './../../data/aftonbladet.json';
import expressen from './../../data/expressen.json';

const match = (source) => {

  let results = [];
  let obj;

  words.forEach(function(val, index, arr) {
    obj = _(source == 'aftonbladet' ? aftonbladet.articles : expressen.articles)
      .filter(function(s) {
        if (s.title) {
          s.title = clean(s.title);
          if (s.title.includes(val) && s.url) {
            console.log('👍 ' + source + ': ' + s.title);
            return JSON.stringify(s)
          }
        }
      }).value();
    results = results.concat(obj);

  });

  fs.writeFileSync(`../data/${source.substring(0,2)}.json`, JSON.stringify(_.uniq(results)), 'utf-8');

}

export default match;