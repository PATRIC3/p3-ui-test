/**
 * takes a single health log file from yesterday (config.healthReport),
 * writes a row to the health calendar file (config.healthCalendar)
 */

const fs = require('fs')
const config = require('../report.config')
const path = require('path')

const parser = require('./health-parser')

const d = new Date()
d.setDate(d.getDate() - 1)
const YESTERDAY = d.toLocaleDateString()

const resultsPath = path.resolve(config.resultsDir)

const fileInName = config.healthReport.replace(/{DATE}/, YESTERDAY)
const fileInPath =  path.resolve(`${resultsPath}/${fileInName}`)
const fileOutName = config.healthCalendar.replace(/{DATE}/, YESTERDAY)
const fileOutPath =  path.resolve(`${resultsPath}/${fileOutName}`)

console.log('files', fileInPath, fileOutPath)

// todo: modularize
const getSummary = (text) => {
  const results = parser(text)

  const testSummary = {}
  testSummary.total = results.length

  results.forEach(result => {
    result.tests.forEach(test => {
      const {name, status, duration} = test

      if (!(name in testSummary)) {
        testSummary[name] = {passed: 0, failed: 0, duration: 0}
      }

      testSummary[name] = {
        passed: testSummary[name].passed + (status == 'P' ? 1 : 0),
        failed: testSummary[name].failed + (status != 'P' ? 1 : 0),
        duration: testSummary[name].duration + duration
      }
    })
  })
  return testSummary
}

function dailySummary(rows) {
  console.log('Aggregating data for', YESTERDAY, '...')

  fs.readFile(fileInPath, 'utf8', (err, text) => {
    if (err) throw err

    const summary = getSummary(text)
    console.log('summary', summary)
    console.log('Appending to calendar file...')
    fs.appendFileSync(fileOutPath, `${JSON.stringify(summary)}\n`)
    console.log('Added entry to calendar file: ', fileOutPath)
  })
}

dailySummary()


