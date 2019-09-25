
const url = 'https://patricbrc.org'


const timeout = 130000 // server has a 2 min timeout

describe('Subsystems tab', () => {

  beforeAll(async () => {
    const view = `${url}/view/GenomeList/?in(genome_id,(106648.10,1144674.3,1785128.3))#view_tab=pathways`
    await page.goto(view, {waitUntil: 'networkidle0', timeout})
    const performanceMetrics = await page._client.send('Performance.getMetrics');
    console.log(page.metrics());
  })

  it('should say have the query at the top of the page', async () => {
    await expect(page).toMatch('106648.10')
    await expect(page).toMatch('1144674.3')
  })


  it('should list 200 pathways', async () => {
    const pieChart = await page.evaluate(() =>
      document.querySelector('#subsystemspiechart svg')
    )
    console.log('pieChart', pieChart)
    return pieChart == null
  })

})
