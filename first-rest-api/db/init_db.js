const Database = require('better-sqlite3')
const db = new Database('stock_db.db')

function init_db() {
    const stmt = db.prepare(`
        CREATE TABLE IF NOT EXISTS produits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT NOT NULL,
            description TEXT,
            prix REAL,
            categorie TEXT NOT NULL
        )
    `)
    stmt.run()
}

init_db()

module.exports = db