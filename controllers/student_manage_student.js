const {
    success,
    errors
} = require('../response/response')
const query = require('../config/mysql_query_async')
const {
    convert
} = require('../helper/convert_object')

const jwt = require('jsonwebtoken')

exports.studentLogOut = async function (req, res) {
    try {
        return success(res, 'RETURN_HOMEPAGE_STUDENT')
    } catch (error) {
        return errors(res, error)
    }
}

exports.studentLogIn = async (req, res) => {
    try {
        let queryString = "SELECT * FROM student WHERE username LIKE '" + req.body.username + "' AND password LIKE '" + req.body.password + "';"
        const result = await query(queryString)
        const data = await convert(result)
        if (data[0]) {
            const token = await jwt.sign(data[0].id_student, process.env.JWT_SECRET, {
                algorithm: 'HS256',
            })
            req.headers['x-access-token'] = token
            return success(res, {...data, token: token})
        }
        return success(res, 'CANNOT_FIND_USER')
    } catch (error) {
        return errors(res, error)
    }
}
exports.studentViewInfo = async (req, res) => {
    try {
        let studentData = req.user
        success(res, studentData)
    } catch (error) {
        errors(res, error)
    }
}

exports.studentUpdateInfo = async (req, res) => {
    try {
        let studentData = req.user
        var queryString = "UPDATE student SET full_name='" + req.body.full_name +
            "',email='" + req.body.email +
            "',birthday='" + req.body.birthday +
            "',phone='" + req.body.phone +
            "',course='" + req.body.course +
            "',cmnd_card_number='" + req.body.cmnd_card_number +
            "',date_valid_room='" + req.body.date_valid_room +
            "' WHERE id_student=" + studentData[0].id_student + ";"
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}

exports.studentSignup = async (req, res) => {
    try {

        let queryString = "INSERT INTO student (username,password,full_name,email,birthday,phone,course,cmnd_number,status) VALUES('" +
            req.body.username +
            "','" +
            req.body.password +
            "','" +
            req.body.full_name +
            "','" +
            req.body.email +
            "','" +
            req.body.birthday +
            "','" +
            req.body.phone +
            "','" +
            req.body.course +
            "','" +
            req.body.cmnd_number +
            "',0);"
        const result = await query(queryString)
        const data = await convert(result)

        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}

exports.studentViewListRoomate = async (req, res) => {
    try {
        const user = req.user
        if (user[0].status === 1) {
            let queryString = "SELECT id_room , date_valid_room, date_out_room FROM room JOIN status_student ON status_student.room = room.id_room JOIN student ON status_student.student = student.id_student WHERE student.id_student = " + user[0].id_student + ";"
            const result = await query(queryString)
            const data = await convert(result)
            const last = data.pop()
            let queryString2 = "SELECT full_name, birthday, email, phone,course,cmnd_number, sex FROM student JOIN status_student ON status_student.student = student.id_student JOIN room ON room.id_room = status_student.room WHERE room.id_room =" + last.id_room + ";"
            const result2 = await query(queryString2)
            const data2 = await convert(result2)
            if(data2.length === 0 ) return success(res, "NOT_FOUND")
            return success(res, data2)
        }
    } catch (error) {
        return errors(res, error)
    }
}