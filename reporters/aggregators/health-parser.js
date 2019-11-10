/**
 * takes a health log file, returns json
 * - todo: modularize
 */

module.exports = function parseLog(data) {
  const rows = data.trim().split('\n');
  const columns = rows.shift().split('\t');

  // remove time from columns list
  columns.shift()

  const records = rows.map(row => {
    const vals = row.split('\t')

    // parse time, remove it from rows
    const timeStr = vals[0]
    const [s, e] = [timeStr.indexOf('[') + 1, timeStr.indexOf(']')]
    const time = vals.shift().slice(s, e)

    const tests = columns.map((name, j) => {
      const result = vals[j]
      return {
        name,
        status: result.split('|')[0],
        duration: Number(result.split('|')[1])
      }
    })

    return {
      time,
      tests,
      status: tests.filter(test => test.status == 'F').length ? 'F' : 'P',
      duration: tests.reduce((total, test) => test.duration + total, 0)
    }
  })

  return records
}
