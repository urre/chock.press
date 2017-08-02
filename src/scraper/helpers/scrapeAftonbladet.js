import chalk from "chalk";
import fs from "fs";
import scrapeIt from "scrape-it";
import _ from "lodash";

const sites = [
  "http://www.aftonbladet.se",
  "http://www.aftonbladet.se/nojesbladet"
];

Array.prototype.delayedForEach = function(callback, timeout, thisArg) {
  var i = 0,
    l = this.length,
    self = this,
    caller = function() {
      callback.call(thisArg || self, self[i], i, self);
      ++i < l && setTimeout(caller, timeout);
    };
  caller();
};

const scrapeAftonbladet = () => {
  sites.delayedForEach((urls, index) => {
    scrapeIt(urls, {
      articles: {
        listItem: urls.includes("nojesbladet") ? "div" : "article",
        data: {
          title: urls.includes("nojesbladet") ? "h3" : "h2",
          url: {
            selector: "a",
            attr: "href"
          }
        }
      }
    }).then(page => {
      // console.log(page);
      fs.writeFileSync(
        "../../src/data/aftonbladet.json",
        JSON.stringify(page),
        "utf-8"
      );
    });
  }, 2000);
};

export default scrapeAftonbladet;
