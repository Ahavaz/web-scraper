const request = require('request')
const cheerio = require('cheerio')
const pdfExtract = require('pdf-extract')
const fs = require('fs')
const inspect = require('eyes').inspector({ maxLength: 20000 })

const jsonArr = require(`./files/links.json`).filter(_ => _.endsWith('.pdf'))
let result = []
let log = []
let c = 0
const absolutePathToPdf = './testPdf2.pdf'
const options = {
	type: 'text'  // extract the actual text in the pdf file
}
const list = [
	'ACUSADO:',
	'ADVOGADO:',
	'APELADO:',
	'APELANTE:',
	'AUTOR:',
	'CONDENADO:',
	'EMBARGADO:',
	'EMBARGANTE:',
	'EXCEPTO:',
	'EXCIPIENTE:',
	'EXEQUENTE:',
	'IMPETRADO:',
	'INTERESSADO:',
	'MPF:',
	'PACIENTE / IMPETRANTE:',
	'PROCURADOR:',
	'RECORRENTE:',
	'RECORRIDO:',
	'RELATOR:',
	'RELATORA:',
	'REPDO.:',
	'REPTE.:',
	'REQUERENTE:',
	'REQUERIDO:',
	'RÉU:'
]

function clearDir(path) {
	try {
		let files = fs.readdirSync(path)
		if(files.length)
			for(file of files)
				fs.unlinkSync(`${path}/${file}`)
	}	catch(e) {
		// console.error(e)
		return
	}
}

function logStatus(link) {
	let status = `${(c * 100 / jsonArr.length).toFixed(2)}%`
	log.push({ Status: status, ID: c, Total: result.length, URL: link })
	console.log(`${status}\t${c}\t${result.length}\t${link}`)
}

function writeFiles() {
	if(c === jsonArr.length) {
		// fs.writeSync()
		// console.log(c)
		fs.writeFileSync(`./files/result.json`, JSON.stringify(result))
		fs.writeFileSync(`./files/log.json`, JSON.stringify(log))
		// console.log(result)
		console.log(`\nDone!`)
	}
}

function formatText(text, path) {
	// let textArray = text.join('').split(/\r\n|   /).filter(_ => _ != '').map(_ => _.trim().toUpperCase()).filter(_ => {
	let textArray = text.join('').split(/\r\n|   /).filter(/./.test.bind(new RegExp(/\S/))).map(_ => _.trim().toUpperCase()).filter(_ => {
		for(tipo of list)
			if(_.startsWith(tipo))
				return true
	})
	// let type = typeof(textArray)
	// console.log(textArray)
	let objArray = textArray.map(_ => ({ Tipo: _.substr(0, _.indexOf(':')), Nome: _.substr(_.indexOf(':') + 1).trim(), URL: path }))
	result = result.concat(objArray)
	// console.log(result)
	// console.log(textArray)
	// console.log(textArray.length)
	// console.log(objArray)
	// console.log(objArray.length)
}

iterateLinks()

console.log(`Status\tID\tTotal\tURL`)
console.log(`Status\tID\tTotal\tURL`)

async function iterateLinks(){
	for([i, url] of jsonArr.entries()) {
		let link = url
		let index = i
		await getData(link, index)
	}
}

async function getData(link, index) {
	await setTimeout(async function() {
		await request({ url: link, encoding: 'binary' }, async function(error, response, body) {
			if(error) throw new Error(error)

			clearDir(`./tmp`)

			if(response.request.uri.href.toUpperCase().endsWith('.PDF')) {
				c++
				let pdfFile = `./tmp/pdf${c}.pdf`
				fs.writeFile(pdfFile, body, async function() {
					let processor = pdfExtract(pdfFile, options, async function(err) {
						if(err) throw new Error(err)
						
						await processor.on('complete', function(data) {
							formatText(data.text_pages, response.request.uri.href)
							// let pdfFileTmp = pdfFile
							// formatText(data.text_pages, data.pdf_path)
							// if(fs.exists(pdfFileTmp))
							// 	fs.unlinkSync(pdfFileTmp)
							// fs.rmdir(`./tmp`)
							logStatus(response.request.uri.href)
							writeFiles()
						})
						
						await processor.on('error', function(err) {
							// console.error(err)
							// logStatus(response.request.uri.href)
							writeFiles()
							return
							// let pdfFileTmp = pdfFile
							// inspect(err, 'error while extracting pages')
							// if(fs.exists(pdfFileTmp))
							// 	fs.unlinkSync(pdfFileTmp)
							// fs.rmdir(`./tmp`)
							// return callback(err)
						})
					})
				})
			}

			if(response.request.uri.href.toUpperCase().endsWith('.HTML')) {
				c++
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
				logStatus(response.request.uri.href)
				writeFiles()
			}

			// let status = `${(c * 100 / jsonArr.length).toFixed(2)}%`
			// log.push({ Status: status, ID: c, Total: result.length, URL: link })
			// console.log(`${status}\t${c}\t${result.length}\t${link}`)

			// if(c === jsonArr.length) {
			// 	// fs.writeSync()
			// 	fs.writeFileSync(`./test/result.json`, JSON.stringify(result))
			// 	fs.writeFileSync(`./test/log.json`, JSON.stringify(log))
			// 	// console.log(result)
			// 	console.log('\nDone!')
			// }
		})
	}, 5000 * index)
}