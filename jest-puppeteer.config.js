module.exports = {
  launch: {
    headless: process.env.HEADLESS !== 'false'
    // slowMo: 500,
    // dumpio: true
  },
  browserContext: 'default',
}
