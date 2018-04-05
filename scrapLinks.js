const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

// const path = `C:\\Users\\Forensics\\Documents\\repos\\web-scraper\\`
// const filesArr = [
// 	`links.json`,
// 	// `links1k.json`,
// 	// `links2k.json`,
// 	// `links3k.json`,
// 	// `links4k.json`,
// 	// `links5k.json`,
// 	// `links6k.json`,
// 	// `links7k.json`,
// 	// `links8k.json`,
// 	// `links9k.json`,
// 	// `links9.23k.json`,
// 	// `linksTest.json`
// ]
// const jsonArr = [].concat(...filesArr.map(_ => require(`./files/${_}`)))
const jsonArr = require(`./files/links.json`)
let result = []
let log = []
let c = 1

console.log(`Status\tID\tTotal\tURL`)

for([i, url] of jsonArr.entries()) {
	let link = url
	let index = i
	getData(link, index)
}

function getData(link, index) {
	setTimeout(function() {
		request({ url: link, encoding: 'binary'}, function(error, response, body) {
			if (error) throw new Error(error)
			const $ = cheerio.load(body)
			$('span.nome_parte').each(function(i, e) {
				let tipo = $(e).parent().children('span.tipo_parte').text()
				let nome = $(e).parent().children('span.nome_parte').text()
				result.push({ Tipo: tipo, Nome: nome, URL: response.request.uri.href })
			})
			$('span.nome_parte_representante').each(function(i, e) {
				let tipo = $(e).parent().children('span.tipo_parte_representante').text()
				let nome = $(e).parent().children('span.nome_parte_representante').text()
				result.push({ Tipo: tipo, Nome: nome, URL: response.request.uri.href })
			})
			$('table div.parte').parent().parent().each(function(i, e) {
				let tipo = $(e).children().first().text()
				let nome = $(e).children().last().text()
				result.push({ Tipo: tipo, Nome: nome, URL: response.request.uri.href })
			})
			let status = `${(c*100/jsonArr.length).toFixed(0)}%`
			log.push({ Status: status, ID: c, Total: result.length, URL: link })
			console.log(`${status}\t${c}\t${result.length}\t${link}`)
			if (c++ === jsonArr.length) {
				fs.writeFileSync(`./files/result.json`, JSON.stringify(result))
				fs.writeFileSync('log.json', JSON.stringify(log))
				console.log(result)
				console.log('\nDone!')
			}
		})
	}, 500 * index)
}