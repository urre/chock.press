const fs = require('fs');
const _ = require('lodash');

import clean from './clean';
import words from './../../data/words.json';
import aftonbladet from './../../data/aftonbladet.json';
import expressen from './../../data/expressen.json';

function multiDimensionalUnique(arr) {
    var uniques = [];
    var itemsFound = {};
    for(var i = 0, l = arr.length; i < l; i++) {
        var stringified = JSON.stringify(arr[i]);
        if(itemsFound[stringified]) { continue; }
        uniques.push(arr[i]);
        itemsFound[stringified] = true;
    }
    return uniques;
}

const match = (source) => {

  let results = [];
  let obj;

  words.forEach(function(val, index, arr) {
    obj = _(source == 'aftonbladet' ? aftonbladet.articles : expressen.articles)
      .filter(function(s) {
        if (s.title) {
          s.title = clean(s.title);
          if (s.title.includes(val) && s.url && s.title.length < 200) {
            console.log('👍 ' + source + ': ' + s.title);
            return JSON.stringify(s)
          }
        }
      }).value();
    results = results.concat(obj);

  });

  var unique = multiDimensionalUnique(results);

  fs.writeFileSync(`../data/${source.substring(0,2)}.json`, JSON.stringify(unique), 'utf-8');

}

export default match;