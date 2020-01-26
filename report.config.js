
module.exports = {
  // end2end/perf tests
  fullReportDir: './results/{TYPE}',
  fullReportName: '{TYPE}_{DATE}.txt',

  // system health (special, condensed version of reports)
  healthDir: './results/health/',
  healthReport: 'health_{DATE}.txt',
  healthErrors: 'health-errors_{DATE}.txt',

  // calendar
  healthCalendarDir: './results/',
  healthCalendarName: 'health-calendar.txt',

  // genome indexer
  indexerDir: './results/indexer/',
  indexerReport: 'indexer-status.txt',
  indexerHistoryLength: 180
}
