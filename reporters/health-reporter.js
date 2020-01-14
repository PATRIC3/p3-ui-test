/**
 * This is a reporter plugin for JEST
 * - Takes results from JEST and logs results
 * - See config file (report.config.js) for output paths
 */

'use strict'
const fs = require('fs')
const config = require('../report.config.js')

// use yyyy-mm-dd format
const d = new Date()
const REPORT_TIME = d.toISOString()
const DATE = REPORT_TIME.split('T')[0]

module.exports = function Reporter(globalConfig, options) {
  this.onRunComplete = (context, results) => {

    // if full report, just write results
    if (options.fullReport) {
      const path = config.fullReportDir
      const reportName = config.fullReportName.replace(/{DATE}/, DATE)
      const reportPath = `${path}/${reportName}`
      createDir(path)
      writeRow(reportPath, JSON.stringify(results))

      return results
    }

    const path = config.healthDir
    const reportName = config.healthReport.replace(/{DATE}/, DATE)
    const failReportName = config.healthErrors.replace(/{DATE}/, DATE)
    createDir(path)

    // aggregate and get log row
    const result = processStats(results)
    const row = getLogRowJSON(result)
    const failRows = getFailLogRows(result)

    const reportPath = `${path}/${reportName}`

    // write the overview log row
    writeRow(reportPath, JSON.stringify(row))

    // write any failed tests
    if (failRows) {
      const failedReportPath = `${path}/${failReportName}`
      writeRow(failedReportPath, failRows)
    }

    return results
  }
}

const createDir = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, {recursive: true})
  }
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
    `[${REPORT_TIME}]\t${obj.ancestorTitles[0]} > ${obj.title}\t${obj.failureMessages.join('\n')}`
  ).join('\n')

  return rows
}


const getLogHeader = (columns) => ['time', ...columns].join('\t')

const writeRow = (filePath, text) => {
  fs.appendFileSync(filePath, `${text}\n`)
}

