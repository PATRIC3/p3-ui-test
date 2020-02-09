
const mailer = require('./mailer')
const {dashboardURL} = require('../report.config')


const getMailTable = ({time, tests}) => {
  const pStyle = 'background: green; color: #fff; width: 75px; text-align: right'
  const fStyle = 'background: red; color: #fff; width: 75px; text-align: right'
  const alignLeft = 'text-align: left'

  return (`
    <p>
      <b>Time:</b> ${time}
    </p>

    <table>
      <tr>
        <th></th>
        ${tests.map(t => `<th align="right">${t.name}</th>`).join('')}
      </tr>
      <tr>
        <th style="${alignLeft}">Status</th>` +
        tests.map(t => (
          t.status == 'P'
            ? `<td style="${pStyle}">Passed</td>`
            : `<td style="${fStyle}">Failed</td>`
        )).join('') +
    `</tr>
      <tr>
        <th style="${alignLeft}">Duration (ms)</th>
        ${tests.map(t => `<td align="right">${t.duration}</td>`).join('')}
      </tr>
    </table>

    ${
    dashboardURL
      ? `<p>View details at the <a href="${dashboardURL}">dashboard</a>.` : ''
    }
  `)
}


const healthMailer = ({data, passed, logs = ''}) => {
  mailer({
    subject: `[PATRIC-Status] ${passed ? 'All-Clear' : 'Service Fail'} Alert`,
    body: getMailTable(data) + '<br>' +
      '<br>' +
      logs
  })
}

module.exports = healthMailer
