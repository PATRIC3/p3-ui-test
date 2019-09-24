
const puppeteer = require('puppeteer')

const url = 'https://patricbrc.org'
const view = `${url}/view/Taxonomy/2`


describe('Overview pages', () => {
  beforeAll(async () => {
    await page.goto(view)
  })

  it('should say bateria', async () => {
    await expect(page).toMatch('Bacteria')
  })

})
