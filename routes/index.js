'use strict'

const router = require('express').Router()

router.get('/', (_, res) => 
  res.sendFile(__dirname + 'public/index.html')
)

module.exports = router