/**
 * poll-indexer.js
 *
 * Polls genome indexer and writes to file
 * using streams, truncates the file as needed.
 */

const fs = require('fs')
const util = require('util')
const mkdir = util.promisify(fs.mkdir)
const appendFile = util.promisify(fs.appendFile)
const rename = util.promisify(fs.rename)

const split = require('split2')
const RemoveFirstLine = require('./truncate')

const axios = require('axios')

// get output report path/name
const config = require('../report.config.js')
const path = config.indexerDir
const reportName = config.indexerReport
const reportPath = `${path}/${reportName}`

const MAX_LINES = config.indexerHistoryLength

const poll = async () => {
  try {
    await mkdir(path, {recursive: true})
  } catch (e) {
    console.error(`could not make dir ${path}`, e)
  }

  // get result
  const res = await axios.get('https://patricbrc.org/api/indexer')
  const data = res.data

  // add time
  const d = new Date()
  data.time = d.toISOString()

  // write the overview log row
  try {
    await appendFile(reportPath, JSON.stringify(data) + '\n')
  } catch (e) {
    console.log(`could not right to file ${reportPath}`, e)
  }

  // remove first line if needed
  let lineCount = 0
  fs.createReadStream(reportPath)
    .pipe(split())
    .on('data', line => lineCount++)
    .on('finish', async () => {
      if (lineCount <= MAX_LINES) return
      await truncate(reportPath)
    })
}

async function truncate(filePath, cb) {
  const input = fs.createReadStream(filePath)
  const output = fs.createWriteStream(filePath + '.tmp')

  const stream = input.pipe(RemoveFirstLine())
    .pipe(output)

  stream.on('finish', async () => {
    await rename(filePath + '.tmp', filePath)
    if (cb) cb()
  })
}


poll()


