module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS !== 'false',
    slowMo: 250
  },
  browserContext: 'default',
}