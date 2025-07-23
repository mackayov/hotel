const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'n3u3da!',
    database: 'testdb'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to mySQL successfully!');
});

module.exports = db;