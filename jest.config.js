
module.exports = {
  preset: 'jest-puppeteer',
  setupFilesAfterEnv: ['./jest.setup.js'],
  reporters: [
    'default',
    ['jest-html-reporters', {
      filename: 'report.html',
    }]
  ]
}
