
const jwt = require('jsonwebtoken')
const query = require('../config/mysql_query_async')
const {
    convert
} = require('../helper/convert_object')
const authentication = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'].replace('Bearer ', '') || req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        let queryString = "SELECT * FROM student WHERE id_student LIKE '" + decoded + "';"

        const result = await query(queryString)
        const data = await convert(result)
        if (!data) {
            throw new Error("Cannot find user")
            
        }
        req.user = data
        next()
    } catch (e) {
        res.status(401).send("Please authentication...")
    }
}

module.exports = authentication