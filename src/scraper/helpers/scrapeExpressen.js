import chalk from 'chalk'
import fs from 'fs'
import scrapeIt from 'scrape-it'
import _ from 'lodash'

const sites = ['http://www.expressen.se']

Array.prototype.delayedForEach = function(callback, timeout, thisArg) {
	var i = 0,
		l = this.length,
		self = this,
		caller = function() {
			callback.call(thisArg || self, self[i], i, self)
			++i < l && setTimeout(caller, timeout)
		}
	caller()
}

const scrapeExpressen = () => {
	sites.delayedForEach((urls, index) => {
		scrapeIt(urls, {
			articles: {
				listItem: '.teaser',
				data: {
					title: '.row h2',
					url: {
						selector: 'a.row',
						attr: 'href'
					}
				}
			}
		}).then(page => {
			// console.log(page);
			fs.writeFileSync(
				'../../src/data/expressen.json',
				JSON.stringify(page),
				'utf-8'
			)
		})
	}, 2000)
}

export default scrapeExpressen
