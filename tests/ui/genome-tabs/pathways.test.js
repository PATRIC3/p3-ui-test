
const {url} = require('../test.config.js')

const timeout = 130000 // server has a 2 min timeout

describe('Pathways tab', () => {

  beforeAll(async () => {
    const view = `${url}/view/GenomeList/?in(genome_id,(1834079.3,1882406.3,2171752.3))#view_tab=pathways`
    await page.goto(view, {waitUntil: 'networkidle0', timeout})
  })

  it('should say have the query at the top of the page', async () => {
    await expect(page).toMatch('1834079.3')
    await expect(page).toMatch('1882406.3')
  })


  it('should list 141 pathways', async () => {
    const pageText = await page.evaluate(() =>
      document.querySelector('.dgrid-pagination .dgrid-status').innerText.slice(0, 7)
    )

    expect(pageText).toBe('1 - 141')
  })

})
