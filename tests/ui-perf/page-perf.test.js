const {url} = require('../test.config')
const {genomes, genes, ...tests} = require('./tests')

const timeout = 180000 // wait for up to 3 minutes

const views = [
  {tests: tests.taxonomyViews, title: 'Taxonomy overview'},
  {tests: tests.genomeOverviews, title: 'Genome overview'},
  {tests: tests.genomeLists, title: 'Genome list'},
  {tests: tests.sequenceLists, title: 'Sequence list'},
  {tests: tests.featureLists, title: 'Feature list'},
  {tests: tests.featureOverviews, title: 'Feature overview'},
  {tests: tests.spGeneLists, title: 'Specialty gene list'},
  {tests: tests.gBrowserViews, title: 'Genome browser'},
  {tests: tests.circularViews, title: 'Circular viewer'},
  {tests: tests.pathways, title: 'Pathways list'} // single genomes
]

/**
 * helpers
 */
const getNext = items =>
  items[new Date().getHours() % items.length]

const pageLoad = async (view) =>
  page.goto(view, {waitUntil: 'networkidle0', timeout})

const getSearchURL = (query) => {
  const q = 'and(' + query.split(' ').map(v => `keyword(${v})`).join(',') + ')'
  return `${url}/search/?${q}`
}


/**
 * The tests follow
 */
const title = 'BACTERIAL BIOINFORMATICS RESOURCE CENTER'

describe('Go to home page (cache some of the assets)', () => {
  it(`${url} should contain BRC title`, async () => {
    await pageLoad(url)
    await expect(page).toMatch(title)
  })
})


describe('Second homepage load', () => {
  it(`${url} should contain BRC title`, async () => {
    await pageLoad(url)
    await expect(page).toMatch(title)
  })
})


describe('Global search (genome)', () => {
  const genome = getNext(genomes)
  const view = getSearchURL(genome)

  it(`${view} should contain ${genome}`, async () => {
    await pageLoad(view)
    await expect(page).toMatch(genome)
  })
})


describe('Global search (gene)', () => {
  const {q: gene, match} = getNext(genes)
  const view = getSearchURL(gene)

  it(`${view} should contain ${gene}`, async () => {

    await pageLoad(view)
    await expect(page).toMatch(match || decodeURIComponent(gene))
  })
})


for (const view of views) {
  const {tests, title} = view

  describe(title, () => {
    const {view, match} = getNext(tests)

    it(`${view} should contain ${match}`, async () => {
      await pageLoad(url + view)
      await expect(page).toMatch(match)
    })
  })
}


