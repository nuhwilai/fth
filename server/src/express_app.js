const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { createQrCode } = require('./qrcode')
const apis = require('./apis')
const _ = require('lodash')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.get('/api/ping', function (req, res) {
  res.send({ ok: 1, response: new Date() })
})

app.get('/api/qrcode', async (req, res) => {
  try {
    if (req.query.text) {
      let thumbnailPath = req.query.imageUrl ? req.query.imageUrl : null
      let image_string = await createQrCode(req.query.text, thumbnailPath)

      const im = image_string.split(',')[1]
      const img = Buffer.from(im, 'base64')

      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length,
      })
      res.end(img)
    } else {
      throw new Error('not found text')
    }
  } catch (error) {
    res.send({
      status: 'fail',
      reason: error.message,
    })
  }
})

_.each(apis, (api, name) => {
  console.info('registering routes for %s', [name])
  app.use(`/api/${name}`, api)
})

module.exports = app
