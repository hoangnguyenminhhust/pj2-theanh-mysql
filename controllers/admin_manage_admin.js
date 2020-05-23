const {
    success,
    errors
} = require('../response/response')
const query = require('../config/mysql_query_async')
const {
    convert
} = require('../helper/convert_object')
const session = require('express-session')


exports.addAdminUser = async function (req, res) {
    try {
        let queryString = "INSERT INTO admin (username,password) VALUES('" +
            req.body.username +
            "','" +
            req.body.password +
            "');"
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}


exports.adminLogOut = async function (req, res) {
    try {
        await req.session.destroy()
        // res.redirect(`http://${req.get('host')}/homepage_admin`)
        return success(res, 'RETURN_HOMEPAGE')
    } catch (error) {
        return errors(res, error)
    }
}

exports.adminLogIn = async (req, res) => {
    try {
        let queryString = "SELECT * FROM admin WHERE username LIKE '" + req.body.username + "' AND password LIKE '" + req.body.password + "';"
        const result = await query(queryString)
        const data = await convert(result)
        if (data[0]) {
            req.session.save()
            return success(res, data[0])
        }
        return success(res, 'CANNOT_FIND_USER')

    } catch (error) {
        return errors(res, error)
    }
}