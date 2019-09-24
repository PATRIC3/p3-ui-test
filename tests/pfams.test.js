
const puppeteer = require('puppeteer')

const url = 'https://patricbrc.org'


beforeAll(async () => {
  await page.setViewport({
    width: 1200,
    height: 900,
    deviceScaleFactor: 1,
  })
})

describe('Brucella pinnipedialis B2/94 protein families tab', () => {

  it('should list 200 proteins', async () => {
    const view = `${url}/view/Genome/520461.7#view_tab=proteinFamilies`
    await page.goto(view)
    const pageText = await page.evaluate(() =>
      document.querySelector('.dgrid-pagination .dgrid-status').innerText.slice(7)
    )
    return pageText == '1 - 200'
  })
})

