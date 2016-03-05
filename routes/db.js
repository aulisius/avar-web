'use strict'

let config = require('../config')

/*
 * The config.json contains a JSON string in the format below
let config = {
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'postgres'
}
*/

const router = require('express').Router()

let repos = {
    user: require('../repo/user'),
    report: require('../repo/report')
}

const db = require('pg-promise')({
    extend: db => {
        db.user = repos.user(db),
        db.report = repos.report(db)
    }
})(process.env.DATABASE_URL || config)

router.get('/', (request, response) =>
    db.user.all()
        .then(res => response.json({ data: res }).end())
        .catch(error =>
            response.render('error', {
                error: error,
                message: error.message
            })
            )
    )

/* 
 * body format
 * name: string
 * uuid: alphanumeric
 * address: string
 * car: string
 */
router.post('/new', (request, response) =>
    db.user.add(request.body)
        .then(() => response.sendStatus(201).end())
        .catch(() => response.sendStatus(400).end())
    )

/*
 * body format 
 * uuid: alphanumeric
 * latX: double
 * latY: double
 * time: milliseconds
 */
router.post('/report', (request, response) =>
    db.report.add(request.body)
        .then(() => response.sendStatus(201).end())
        .catch(error => response.sendStatus(400).end())
    )

/*
 * params format
 * uuid: alphanumeric 
 */
router.delete('/remove/:uuid', (request, response) =>
    db.user.remove(request.params.uuid)
        .then(done => response.sendStatus(done ? 204 : 404).end())
        .catch(error => response.sendStatus(400).end())
    )

/*
 * params format
 * uuid: alphanumeric 
 */
router.get('/:uuid', (request, response) =>
    db.user.find(request.params.uuid)
        .then(user => response.json(user).end())
        .catch(error => response.sendStatus(404).end())
    )

module.exports = router