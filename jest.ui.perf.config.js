
module.exports = {
  preset: 'jest-puppeteer',
  setupFilesAfterEnv: ['./jest.setup.js'],
  reporters: [
    'default',
    ['./reporters/reporter.js', {
      fullReport: true,
      type: 'performance'
    }]
  ]
}
