'use strict'

let config = {
    host: 'localhost',
    port: 5432,
    database: 'postgres',
}

const router = require('express').Router()

const db = require('pg-promise')({
    extend: function () {
        this.user = require('../repo/user')(this)
    }
})(process.env.DATABASE_URL || config)

router.post('/new', (request, response) =>
    db.user
        .add(request.body)
        .then(() => response.sendStatus(200).end())
        .catch(() => response.sendStatus(400).end())
    )

module.exports = router
