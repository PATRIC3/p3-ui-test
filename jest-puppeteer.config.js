module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS !== 'false',
    // slowMo: 500
  },
  browserContext: 'default',
}