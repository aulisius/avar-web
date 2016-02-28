'use strict'

module.exports = db => ({
    
    add: body => db.none('INSERT INTO users(uuid, name, address, car) VALUES(${uuid}, ${name}, ${address}, ${car})', body),

    remove: uuid => db.result("DELETE FROM users WHERE uuid LIKE $1", uuid)
        .then((result) => result.rowCount === 1),

    find: uuid => db.oneOrNone("SELECT * FROM users WHERE uuid LIKE $1", uuid),

    all: () => db.any("SELECT * FROM users")
    
})