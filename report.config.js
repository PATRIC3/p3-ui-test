
module.exports = {
  // system health (special, condensed version of reports)
  healthReportPath: './results/health/health_{DATE}.txt',
  healthErrorPath: './results/health/health-errors_{DATE}.txt',

  // end2end/perf tests ("type" is passed to reporter)
  fullReportPath: './results/{TYPE}/{TYPE}_{DATE}.txt',

  // calendar
  healthCalendarPath: './results/health-calendar.txt',

  // genome indexer
  indexerReportPath: './results/indexer/indexer-status.txt',
  indexerHistoryLength: 180,

  // file with list of email addresses
  mailListPath: './mailers/mail-list.txt',
  fromListPath: './mailers/from-list.txt',

  // mail config
  sendmail: true,
  sendmailPath: '/usr/sbin/sendmail',
  mailStatePath: './.state/mail-state.json',

  // mail template config
  dashboardURL: 'https://status.patricbrc.org/'
}
