import fs from 'fs'
import series from 'async-series'
import match from './helpers/match'

series(
	[
		done => {
			match('expressen')
			done()
		},
		done => {
			match('aftonbladet')
			done()
		}
	],
	function(err) {}
)
