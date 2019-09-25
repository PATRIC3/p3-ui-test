
require('expect-puppeteer')

jest.setTimeout(150000)

beforeAll(async () => {
  await page.setViewport({
    width: 1200,
    height: 900,
    deviceScaleFactor: 1,
  })
})
