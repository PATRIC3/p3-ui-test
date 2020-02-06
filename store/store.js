const fs = require('fs')
const path = require('path')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const mkdir = util.promisify(fs.mkdir)


class Store {

  constructor({path}) {
    this.filePath = path

    this.init()
    return this
  }

  async init() {
    await createDir(path.dirname(this.filePath))

    try {
      this.data = JSON.parse(await readFile(this.filePath, 'utf8'))
    } catch (e) {
      if (e.code === 'ENOENT') {
        // if no file, start one
        this.data = {}
        this.write()
      } else {
        throw e
      }
    }
  }

  set(key, val) {
    this.data[key] = val
    this.write()
  }

  get(key) {
    return this.data[key]
  }

  delete(key) {
    delete this.data[key]
    this.write()
  }

  hasKey(key) {
    return key in this.data
  }

  async write() {
    this.data = await writeFile(this.filePath, JSON.stringify(this.data), 'utf8')
  }
}


const createDir = async (path) => {
  if (fs.existsSync(path)) return
  await mkdir(path, {recursive: true})
}


module.exports = (args) => new Store(args)
