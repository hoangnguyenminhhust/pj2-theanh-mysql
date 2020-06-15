const {
    success,
    errors
} = require('../response/response')
const query = require('../config/mysql_query_async')
const {
    convert
} = require('../helper/convert_object')

exports.adminUpdateRoom = async function (req, res) {
    try {
        var queryString = "UPDATE room SET full_name='" + req.body.room_name +
            "',building='" + req.body.building +
            "',room_size='" + req.body.room_size +
            "',room_price='" + req.body.email +
            "',room_status='" + req.body.room_status +
            "',room_gender='" + req.body.room_gender +
            "',max_student='" + req.body.max_student +
            "',current_student='" + req.body.current_student +
            "' WHERE id_room=" + req.params.id_room + ";"
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}

exports.adminDeleteRoom = async (req, res) => {
    try {
        let queryString = "DELETE FROM student WHERE id_room=" + req.params.id_room + ";"
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}


exports.adminViewInfoRoom = async (req, res) => {
    try {
        let queryString = "SELECT * FROM student WHERE id_room=" + req.params.id_room + ";"
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}

exports.adminListAllRoom = async (req, res) => {
    try {
        let queryString = "SELECT * FROM room;"
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}

exports.adminCreateRoom = async function (req, res) {
    try {
        var queryString = "INSERT INTO room (building,name_room,room_size,room_price,room_gender,max_student) VALUES ('" + req.body.building + "','" + req.body.room_name + "'," + req.body.room_size + "," + req.body.room_price + ",'" + req.body.room_gender + "'," + req.body.max_student + ",0);"
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}