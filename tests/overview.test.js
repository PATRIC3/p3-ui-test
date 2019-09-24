
const puppeteer = require('puppeteer')

const url = 'https://patricbrc.org'

beforeAll(async () => {
  await page.setViewport({
    width: 1200,
    height: 900,
    deviceScaleFactor: 1,
  })
})


describe('Bacteria overview page', () => {

  beforeAll(async () => {
    const view = `${url}/view/Taxonomy/2`
    await page.goto(view)
  })

  it('should say Bacteria', async () => {
    await expect(page).toMatch('Bacteria')
  })


  it('should say have Mycobacterium leprae TN in genome list', async () => {
    await expect(page).toMatch('Mycobacterium leprae TN')
  })

})

describe('Brucella overview page', () => {

  it('should say Bacillus', async () => {
    const view = `${url}/view/Taxonomy/1386#view_tab=overview`
    await page.goto(view)
    await expect(page).toMatch('Bacillus')
  })
})


describe('Genomes tab', () => {

  it('should list 200 genomes', async () => {
    const view = `${url}/view/Taxonomy/2#view_tab=genomes`
    await page.goto(view)

    const pageText = await page.evaluate(() =>
      document.querySelector('.dgrid-pagination .dgrid-status').innerText.slice(7)
    )
    return pageText == '1 - 200'
  })
})


