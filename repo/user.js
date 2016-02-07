'use strict'

module.exports = function (db) {
    return {
        add: body => db.none('INSERT INTO test_table(id, name) VALUES(${id}, ${name})', body),

        remove: id => db.result("DELETE FROM test_table WHERE id=$1", id)
            .then((result) => result.rowCount === 1),

        find: id => db.oneOrNone("SELECT * FROM test_table WHERE id = $1", id),

        all: () => db.any("SELECT * FROM test_table")
    }
}