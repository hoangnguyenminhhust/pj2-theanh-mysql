const {
    success,
    errors
} = require('../response/response')
const query = require('../config/mysql_query_async')
const {
    convert
} = require('../helper/convert_object')

exports.adminUpdateStudent = async function (req, res) {
    try {
        var queryString = "UPDATE student SET full_name='" + req.body.full_name +
            "',username='" + req.body.username +
            "',password='" + req.body.password +
            "',email='" + req.body.email +
            "',birthday='" + req.body.birthday +
            "',phone='" + req.body.phone +
            "',course='" + req.body.course +
            "',cmnd_card_number='" + req.body.cmnd_card_number +
            "',student_status='" + req.body.student_status +
            "',date_valid_room='" + req.body.date_valid_room +
            "' WHERE id_student=" + req.params.id_student + ";"
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}

exports.adminDeleteStudent = async (req, res) => {
    try {
        let queryString = "DELETE FROM student WHERE id_student=" + req.params.id_student + ";"
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}


exports.adminViewInfoStudent = async (req, res) => {
    try {
        let queryString = "SELECT * FROM student WHERE id_student=" + req.params.id_student + ";"
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}

exports.adminListAllStudent = async (req, res) => {
    try {
        let queryString = "SELECT * FROM student;"
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}


exports.adminArrangeStudentToRoom = async (req, res) => {
    try {
        let queryString = "UPDATE student SET id_room=" + req.params.id_room + " WHERE id_student=" + req.params.id_student + ";"
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}



exports.s = async (req, res) => {
    try {
        let queryString = "UPDATE student SET id_room=NULL WHERE id_student=" + req.params.id_student + ";"
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}