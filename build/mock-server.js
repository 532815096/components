const express =  require('express')
const fs = require('fs')
const path = require('path')
var chalk = require('chalk')
const mock = require('../mock/route')

const router = express.Router()
const app = express()
const port = 8000

for (var url in mock) {
  var mockFile = mock[url]
  router.post(url, (function (mockFile) {
    return function (req, res) {
      res.setHeader('Content-Type', 'application/json')
      res.send(fs.readFileSync(path.resolve(__dirname, `../mock/${mockFile}`)))
    }
  })(mockFile))

  router.get(url, (function (mockFile) {
    console.log('url', url, mockFile)
    return function (req, res) {
      res.setHeader('Content-Type', 'application/json')
      res.send(fs.readFileSync(path.resolve(__dirname, `../mock/${mockFile}`)))
    }
  })(mockFile))

  router.put(url, (function (mockFile) {
    return function (req, res) {
      res.setHeader('Content-Type', 'application/json')
      res.send(fs.readFileSync(path.resolve(__dirname, `../mock/${mockFile}`)))
    }
  })(mockFile))
}

app.use('/', router)

app.listen(port)
console.log(chalk.green(`mock server run successful listen at ${port} `))
