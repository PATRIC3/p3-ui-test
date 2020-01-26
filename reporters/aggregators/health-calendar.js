/**
 * - takes a single health log file path.
 *   defaults to `config.healthReport` with DATE being yesterday (UTC)
 * - writes a row to the health calendar file (config.healthCalendar)
 */

const fs = require('fs')
const config = require('../../report.config')
const path = require('path')

let DATE
let fileInPath
let fileOutPath
if (process.argv[2]) {
  // if log path is provided, use date of file
  fileInPath = path.resolve(process.argv[2])
  const fileName = fileInPath.split('/').pop()
  DATE = fileName.match(/\d{4}-\d{2}-\d{2}/g)[0]

  const dir = path.resolve(config.healthCalendarDir)
  const fileOutName = config.healthCalendarName
  fileOutPath =  path.resolve(`${dir}/${fileOutName}`)
} else {
  // otherwise, use yesterday's date
  const d = new Date()
  d.setDate(d.getDate() - 1)
  const [yyyy, mm, dd] = [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2), ('0' + d.getDate()).slice(-2)]
  DATE = `${yyyy}-${mm}-${dd}`

  const dir = path.resolve(config.healthCalendarDir)

  const fileInName = config.healthReport.replace(/{DATE}/, DATE)
  fileInPath = path.resolve(`${dir}/${fileInName}`)

  const fileOutName = config.healthCalendarName
  fileOutPath =  path.resolve(`${dir}/${fileOutName}`)
}


const getSummary = (text) => {
  const results = text.trim().split('\n').map(obj => JSON.parse(obj))

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
  testSummary.date = DATE

  return testSummary
}

function dailySummary(rows) {
  console.log('Aggregating data for', fileInPath, '...')

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


