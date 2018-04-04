const fs = require('fs')

let arr = []
let filt = []

// fs.readFile('links10k.txt', {encoding: 'utf8'}, function(err, data) {
// 	if (err) return console.log(err)
// 	arr = data.toString().split('\n')
// 	console.log(arr)
// 	filt = arr.filter(_ => _.endsWith('.html'))
// 	for(e of filt) {
// 		console.log(e)
// 	}
// 	console.log(Array.from(filt).length)
// 	return arr
// })

json = require(`C:\\Users\\lucas\\git-repos\\web-scraper\\results.json`)
json.map(_ => console.log(_))
console.log(json.length)