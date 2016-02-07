'use strict'

let config = {
    host: 'localhost',
    port: 5432,
    database: 'postgres',
}

const router = require('express').Router()

const db = require('pg-promise')({
    extend: function() { 
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

router.post('/new', (request, response) =>
    db.user
        .add(request.body)
        .then(() => response.sendStatus(201).end())
        .catch(() => response.sendStatus(400).end())
    )

router.delete('/remove', (request, response) =>
    db.user
        .remove(request.query.uuid)
        .then(done => response.sendStatus(done ? 204 : 404).end())
        .catch(() => response.sendStatus(400).end())
    )

router.get('/:uuid', (request, response) =>
    db.user
        .find(request.params.uuid)
        .then(user => response.json(user).end())
        .catch(() => response.sendStatus(404).end())
    )

module.exports = router
