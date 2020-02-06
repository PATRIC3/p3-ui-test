const nodemailer = require('nodemailer')
const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const {mailListPath, fromListPath} = require('../report.config')


const showErrMsg = e =>
  console.error(`Failed parsing mail-list file with path; ${e}`)


// helper to get mail-lists
async function getList(path) {
  const data = await readFile(path, 'utf8')
  const lines = data.split('\n').map(l => l.trim())
  return lines
}


async function mailer({body, subject}) {
  if (!body || !subject) {
    throw 'body and subject are required for the mailer'
  }

  const transporter = nodemailer.createTransport({
    sendmail: true
  })

  let fromList
  try {
    fromList = await getList(fromListPath)
  } catch (e) {
    showErrMsg(e)
    return
  }

  let mailList
  try {
    mailList = await getList(mailListPath)
  } catch (e) {
    showErrMsg(e)
    return
  }

  // send mail
  const info = await transporter.sendMail({
    from: fromList,
    to: mailList,
    subject,
    html: body
  })

  console.log(`Mail sent: ${JSON.stringify(info, null, 4)}`)
}


module.exports = mailer
