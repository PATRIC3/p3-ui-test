/**
 * takes a single health log file from yesterday (config.healthReport),
 * writes a row to the health calendar file (config.healthCalendar)
 */

const fs = require('fs')
const config = require('../report.config')
const path = require('path')

const parser = require('./health-parser')

// get yesterday
const d = new Date()
d.setDate(d.getDate() - 1)
const [yyyy, mm, dd] = [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2), ('0' + d.getDate()).slice(-2)]
const YESTERDAY = `${yyyy}-${mm}-${dd}`

const resultsPath = path.resolve(config.healthDir)

const fileInName = config.healthReport.replace(/{DATE}/, YESTERDAY)
const fileInPath =  path.resolve(`${resultsPath}/${fileInName}`)
const fileOutName = config.healthCalendar.replace(/{DATE}/, YESTERDAY)
const fileOutPath =  path.resolve(`${resultsPath}/${fileOutName}`)


const getSummary = (text) => {
  const results = parser(text)

  const services = {}
  results.forEach(result => {
    result.tests.forEach(test => {
      const {name, status, duration} = test

      if (!(name in services)) {
        services[name] = {passed: 0, failed: 0, duration: 0}
      }

      services[name] = {
        passed: services[name].passed + (status == 'P' ? 1 : 0),
        failed: services[name].failed + (status != 'P' ? 1 : 0),
        duration: services[name].duration + duration
      }
    })
  })

  const testSummary = {}

  // add services to summary as list of objects
  testSummary.services = Object.keys(services).map(name => ({name, ...services[name]}))
  testSummary.total = results.length
  testSummary.date = YESTERDAY

  return testSummary
}

function dailySummary(rows) {
  console.log('Aggregating data for', YESTERDAY, '...')

  fs.readFile(fileInPath, 'utf8', (err, text) => {
    if (err) throw err

    const summary = getSummary(text)
    console.log('\n', JSON.stringify(summary, null, 4), '\n')

    console.log('Appending to calendar file...')
    fs.appendFileSync(fileOutPath, `${JSON.stringify(summary)}\n`)
    console.log('Added entry to calendar file: ', fileOutPath)
  })
}

dailySummary()


