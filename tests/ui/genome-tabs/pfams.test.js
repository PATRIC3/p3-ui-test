const sleep = require('util').promisify(setTimeout)
const url = 'https://patricbrc.org'


describe('Brucella pinnipedialis B2/94 protein families tab', () => {

  it('should list 200 proteins', async () => {
    const view = `${url}/view/Genome/520461.7#view_tab=proteinFamilies`
    await page.goto(view, {waitUntil: 'networkidle0'})
    const pageText = await page.evaluate(() =>
      document.querySelector('.dgrid-pagination .dgrid-status').innerText.slice(0, 7)
    )
    expect(pageText).toBe('1 - 200')
  })
})

