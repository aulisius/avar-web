'use strict'

const router = require('express').Router(),
    pg = require('pg-promise')()

let cn = {
    host: 'localhost', 
    port: 5432,
    database: 'postgres',
}

let db = pg(process.env.DATABASE_URL || cn)

router.get('/', (request, response) => {
    console.log("/db")
    db.any('SELECT * FROM test_table')
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
})

module.exports = router
