/**
 * This file is a reporter plugin for JEST
 * - Takes results from JEST and writes a tsv health report file
 * - The config for the output name is report.config.js > healthReport
 */

'use strict'
const fs = require('fs')
const config = require('./report.config.js')

// use yyyy-mm-dd format
const REPORT_TIME = new Date().toLocaleString()
const DATE = REPORT_TIME.split(' ')[0]

const path = config.resultsDir
const reportName = config.healthReport.replace(/{DATE}/, DATE)
const failReportName = config.healthErrors.replace(/{DATE}/, DATE)

module.exports = function Reporter(globalConfig, options) {
  this.onRunComplete = (context, results) => {

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path)
    }

    // aggregate and get log row
    const result = processStats(results)
    const row = getLogRow(result)
    const failRows = getFailLogRows(result)

    // if overview file doesn't exist create file with columns
    const reportPath = `${path}/${reportName}`
    if (!fs.existsSync(reportPath)) {
      writeRow(reportPath, getLogHeader(result.columns))
    }

    // write the overview log row
    writeRow(reportPath, row)

    // write any failed tests
    if (failRows) {
      const failedReportPath = `${path}/${failReportName}`
      writeRow(failedReportPath, failRows)
    }

    return results
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

const getLogRow = (result) =>
  `[${REPORT_TIME}]` + '\t' +
    result.tests
      .map(obj => `${obj.status}|${obj.duration}`)
      .join('\t')


const getFailLogRows = (result) => {
  // first filter out any failed tests
  const failedTests = result.tests.filter(obj => obj.status != 'P')
  if (!failedTests.length) return null

  const rows = failedTests.map(obj =>
    `[${REPORT_TIME}]\t${obj.ancestorTitles[0] > obj.title}\t${obj.failureMessages.join('\n')}`
  ).join('\n')

  return rows
}

const getLogHeader = (columns) => ['time', ...columns].join('\t')

const writeRow = (filePath, text) => {
  fs.appendFileSync(filePath, `${text}\n`)
}

