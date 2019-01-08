import fs from 'fs'
import series from 'async-series'
import scrapeExpressen from './helpers/scrape-expressen'
import scrapeAftonbladet from './helpers/scrape-aftonbladet'

series(
	[
		done => {
			scrapeAftonbladet()
			done()
		},
		done => {
			scrapeExpressen()
			done()
		}
	],
	function(err) {}
)
