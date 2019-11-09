
const axios = require('axios')

const auth = 'https://user.patricbrc.org/'
const dataAPI = 'https://patricbrc.org/api/genome/?http_accept=application/solr+json'
const ws = 'https://p3.theseed.org/services/Workspace/ping'
const shock = 'https://p3.theseed.org/services/shock_api/node'
const appService = 'https://p3.theseed.org/services/app_service/ping'
const minHash = 'https://p3.theseed.org/services/minhash_service/ping'
const homology = 'https://p3.theseed.org/services/homology_service/ping'

const WRITE_RESULTS = true


describe('Auth', () => {

  it('should return 200', async () => {
    const res = await axios.get(auth)
    expect(res.status).toBe(200)
  })
})


describe('Data API', () => {

  let res
  beforeAll(async () => {
    res = await axios.get(dataAPI)
  })

  it('should return 200', async () => {
    expect(res.status).toBe(200)
  })

  it('should return 25 items', () => {
    expect(res.data.response.docs.length).toBe(25)
  })
})


describe('Workspace', () => {

  it('should return 200', async () => {
    const res = await axios.get(ws)
    expect(res.status).toBe(200)
  })
})


describe('App Service', () => {

  it('should return 200', async () => {
    const res = await axios.get(appService)
    expect(res.status).toBe(200)
  })
})

describe('Shock', () => {

  it('should return 200', async () => {
    const res = await axios.get(shock)
    expect(res.status).toBe(200)
  })
})


describe('Min Hash Service', () => {

  it('should return 200', async () => {
    const res = await axios.get(minHash)
    expect(res.status).toBe(200)
  })
})


describe('Homology Service', () => {

  it('should return 200', async () => {
    const res = await axios.get(homology)
    expect(res.status).toBe(200)
  })
})

afterAll(() => {
  console.log('the tests are done', this)
})
