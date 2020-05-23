const dotenv = require('dotenv')
const mysql = require('mysql');
const util = require('util');
dotenv.config()

const config = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE
}
const conn = mysql.createConnection(
    config
);
const query = util.promisify(conn.query).bind(conn);

module.exports = query;