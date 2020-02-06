/**
 * Reporter plugin for JEST
 * - Takes results from JEST and logs results
 * - See config file (report.config.js) for output paths
 */

'use strict'
const fs = require('fs')
const config = require('../report.config.js')
const path = require('path')
const {mailer} = require('../mailers/health.js')

// use yyyy-mm-dd format
const d = new Date()
const REPORT_TIME = d.toISOString()
const DATE = REPORT_TIME.split('T')[0]

module.exports = function Reporter(globalConfig, options) {
  this.onRunComplete = (context, results) => {

    // if full report, just write results
    if (options.fullReport) {
      const fullReportPath = config.fullReportPath
        .replace(/{TYPE}/g, options.type)
        .replace(/{DATE}/g, DATE)

      createDir(path.dirname(fullReportPath))
      writeRow(fullReportPath, JSON.stringify(results))

      return results
    }

    const reportPath = config.healthReportPath.replace(/{DATE}/, DATE)
    const errorReportPath = config.healthErrorPath.replace(/{DATE}/, DATE)
    createDir(path.dirname(reportPath))
    createDir(path.dirname(errorReportPath))

    // aggregate and get log row
    const result = processStats(results)
    const row = getLogRowJSON(result)
    const failRows = getFailLogRows(result)

    // write the overview log row
    writeRow(reportPath, JSON.stringify(row))

    // write any failed tests, send mail
    if (failRows) {
      writeRow(errorReportPath, failRows)
      mailer(JSON.stringify(row, null, 4) + '\n\nErrors:\n' + failRows)
    }

    return results
  }
}

const createDir = (path) => {
  if (fs.existsSync(path)) return
  fs.mkdirSync(path, {recursive: true})
}


const processStats = (results) => {
  const testResults = results.testResults[0].testResults
  const columns = testResults.map(test => test.ancestorTitles[0])

  const tests = testResults.map(test => {
    const {status, duration, failureMessages, title, ancestorTitles} = test
    return {
      status: status == 'passed' ? 'P' : 'F',
      duration,
      failureMessages,
      title,
      ancestorTitles
    }
  })

  return {columns, tests}
}


const getLogRowJSON = ({tests, columns}) => {
  return {
    time: REPORT_TIME,
    tests: tests.map(({status, duration}, i) => ({status, duration, name: columns[i]}))
  }
}


const getFailLogRows = (result) => {
  // first filter out any failed tests
  const failedTests = result.tests.filter(obj => obj.status != 'P')
  if (!failedTests.length) return null

  const rows = failedTests.map(obj =>
    `[${REPORT_TIME}]\t${obj.ancestorTitles[0]} > ${obj.title}\n${obj.failureMessages.join('\n')}`
  ).join('\n')

  return rows
}


const writeRow = (filePath, text) => {
  fs.appendFileSync(filePath, `${text}\n`)
}

