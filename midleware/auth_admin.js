const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const query = require('../config/mysql_query_async')
const {
    convert
} = require('../helper/convert_object')
const authentication = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'] || req.header('Authorization').replace('Bearer ', '')
        if (token !== "hoangnm")
            throw new Error("Cannot find user")
        next()
    } catch (e) {
        res.status(401).send("Please authentication...")
    }
}

module.exports = authentication