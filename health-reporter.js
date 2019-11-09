'use strict'

const fs = require('fs')

const reportPath = './results/'
const reportName = 'health.tsv'

module.exports = function Reporter(globalConfig, options) {
  this.onRunComplete = (context, results) => {

    if (!fs.existsSync(reportPath)) {
      fs.mkdirSync(reportPath)
    }

    console.log('results', processRow(results))

    return results
  }
}


function processRow(results) {
  const tests = results.testResults[0].testResults
  const columns = tests.map(test => test.ancestorTitles[0])

  const row = tests.map(test =>
    [test.status == 'passed' ? 1 : 0, test.duration]
  )

  return {columns, row}
}
