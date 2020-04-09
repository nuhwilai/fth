const router = require('express').Router()
const mongojs = require('mongojs')
const { db } = require('../database')

router.get('/', async (req, res) => {
  res.send({ valid: true, data: {} })
})

router.get('/:id', async (req, res) => {
  try {
    res.send({ valid: true, data: {} })
  } catch (error) {
    res.send({ valid: false, reason: error.message })
  }
})

module.exports = router
