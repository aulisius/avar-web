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


router.get('/', (request, response) =>
    db.user
        .all()
        .then(data =>
            response.render('db', {
                result: data
            })
            )
        .catch(error =>
            response.render('error', {
                error: error,
                message: error.message
            })
            )
    )

module.exports = router
