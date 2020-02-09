/**
 * Reporter plugin for JEST
 * - Takes results from JEST and logs results
 * - See config file (report.config.js) for output paths
 */

'use strict'
const fs = require('fs')
const config = require('../report.config.js')
const path = require('path')
const healthMailer = require('../mailers/health-mailer.js')

const Store = require('../store/store.js')({path: config.mailStatePath})

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
    const data = getLogData(result)
    const failLog = getFailLog(result)

    // write the overview log row
    writeRow(reportPath, JSON.stringify(data))

    // write any failed tests
    if (failLog) {
      writeRow(errorReportPath, failLog)
    }

    // if failed and no recent fails, send alert
    if (failLog && !Store.get('recentFail')) {
      healthMailer({data, passed: false, logs: failLog})
      Store.set('recentFail', true)

    // if passed, but has recent fail, send all-clear
    } else if (!failLog && Store.get('recentFail')) {
      healthMailer({data, passed: true})
      Store.set('recentFail', false)
    }

    return results
  }
}


const createDir = (path) => {
  if (fs.existsSync(path)) return
  fs.mkdirSync(path, {recursive: true})
}


// returns condensed version of test resport
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


const getLogData = ({tests, columns}) => ({
  time: REPORT_TIME,
  tests: tests.map(({status, duration}, i) => ({status, duration, name: columns[i]}))
})


const getFailLog = (result) => {
  // first filter out any non-passed tests
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

