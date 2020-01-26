
const {url} = require('../../test.config')


describe('Bacteria overview tab', () => {

  beforeAll(async () => {
    const view = `${url}/view/Taxonomy/2`
    await page.goto(view, {waitUntil: 'networkidle0'})
  })

  it('should say Bacteria', async () => {
    await expect(page).toMatch('Bacteria')
  })

  // test that representative genome list rendered
  it('should say have Mycobacterium leprae TN in genome list', async () => {
    await expect(page).toMatch('Mycobacterium leprae TN')
  })

})

describe('Brucella overview page', () => {

  beforeAll(async () => {
    const view = `${url}/view/Taxonomy/1386#view_tab=overview`
    await page.goto(view, {waitUntil: 'networkidle0'})
  })

  it('should say "Bacillus"', async () => {
    await expect(page).toMatch('Bacillus')
  })

  // test that representative genome list rendered
  it('should say have "Bacillus cereus ATCC 14579" in genome list', async () => {
    await expect(page).toMatch('Bacillus cereus ATCC 14579')
  })
})


describe('Genomes tab', () => {

  beforeAll(async () => {
    const view = `${url}/view/Taxonomy/2#view_tab=genomes`
    await page.goto(view, {waitUntil: 'networkidle0'})
  })

  it('should list 200 genomes', async () => {
    const pageText = await page.evaluate(() =>
      document.querySelector('.dgrid-pagination .dgrid-status').innerText.slice(0, 7)
    )

    expect(pageText).toBe('1 - 200')
  })
})


