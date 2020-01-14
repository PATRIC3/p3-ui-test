
module.exports = {
  // system health
  healthDir: './results/health/',
  healthReport: 'health_{DATE}.txt',
  healthErrors: 'health-errors_{DATE}.txt',
  healthCalendar: 'health-calendar.txt',

  // end2end tests
  fullReportDir: './results/end2end',
  fullReportName: 'end2end_{DATE}.txt',

  // genome indexer
  indexerDir: './results/indexer/',
  indexerReport: 'indexer-status.txt',
  indexerHistoryLength: 180
}
