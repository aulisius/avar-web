'use strict'

module.exports = (db) => ({
    
    add: body => db.none('INSERT INTO accident(uuid, latX, latY) VALUES(${uuid}, ${latX}, ${latY})', body),

    find: uuid => db.any("SELECT * FROM accident WHERE uuid LIKE '$1^'", uuid),

    all: () => db.any("SELECT * FROM accident")
    
})