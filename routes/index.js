'use strict'

const router = require('express').Router()

router.get('/', (_, res) => 
  res.render('index', {
      title : "Express"
  })
)

module.exports = router