'use strict'

let config = {
    host: 'localhost',
    port: 5432,
    database: 'postgres',
}

const router = require('express').Router()

const db = require('pg-promise')({
    extend: function () {
        this.user = require('../repo/user')(this),
        this.report = require('../repo/report')(this)
    }
})(process.env.DATABASE_URL || config)

router.get('/', (request, response) =>
    db.user
        .all()
        .then(data => response.json(data).end())
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
    db.user
        .add(request.body)
        .then(() => response.sendStatus(201).end())
        .catch(() => response.sendStatus(400).end())
    )

/*
 * body format 
 * uuid: alphanumeric
 * latX: double
 * latY: double
 */
router.post('/report', (request, response) =>
    db.report
        .add(request.body)
        .then(() => response.sendStatus(201).end())
        .catch(error => response.sendStatus(400).end())
    )

/*
 * query format
 * uuid: alphanumeric 
 */
router.delete('/remove', (request, response) =>
    db.user
        .remove(request.query.uuid)
        .then(done => response.sendStatus(done ? 204 : 404).end())
        .catch(error => response.sendStatus(400).end())
    )

/*
 * params format
 * uuid: alphanumeric 
 */
router.get('/:uuid', (request, response) =>
    db.user
        .find(request.params.uuid)
        .then(user => response.json(user).end())
        .catch(error => response.sendStatus(404).end())
    )

module.exports = router