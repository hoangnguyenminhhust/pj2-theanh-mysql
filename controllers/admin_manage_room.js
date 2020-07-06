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
        var queryString = "UPDATE room SET name_room='" + req.body.name_room +
            "',building='" + req.body.building +
            "',room_size='" + req.body.room_size +
            "',room_price='" + req.body.room_price +
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

        let queryString = "SELECT id_status FROM status_student JOIN room ON room.id_room = status_student.room WHERE id_room ="+req.params.id_room+""
        const result = await query(queryString)
        const data = await convert(result)

        data.forEach(async e => {
            let queryString2 = "DELETE FROM status_student WHERE id_status=" + e.id_status + ";"
            await query(queryString2)
        })
        let queryString3 = "DELETE FROM room WHERE id_room = " + req.params.id_room + ";"
        await query(queryString3)
        return success(res, "ok")
    } catch (error) {
        return errors(res, error)
    }
}


exports.adminViewInfoRoom = async (req, res) => {
    try {
        let queryString = "SELECT * FROM room WHERE id_room=" + req.params.id_room + ";"
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}

exports.adminListAllRoom = async (req, res) => {
    try {
        let queryString = "SELECT * FROM room WHERE room_status = 1"
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}

exports.adminListAllRoomFail = async (req, res) => {
    try {
        let queryString = "SELECT * FROM room WHERE room_status = 0"
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}

exports.adminCreateRoom = async function (req, res) {
    try {
        var queryString = "INSERT INTO room (building,name_room,room_size,room_price,room_gender,max_student,current_student,room_status) VALUES ('" + req.body.building +
            "','" + req.body.name_room +
            "'," + req.body.room_size +
            "," + req.body.room_price +
            ",'" + req.body.room_gender +
            "'," + req.body.max_student +
            ",0," + req.body.room_status + ");"
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}

exports.adminCheckRoomFree = async function (req, res) {
    try {
        var queryString = "SELECT * FROM room WHERE (max_student - current_student) > 0 ORDER BY (max_student - current_student)"
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}
exports.adminCheckByBuilding = async function (req, res) {
    try {
        var queryString = "SELECT * FROM room WHERE (building='"+req.params.building+"') > 0 ORDER BY (max_student - current_student)"
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}

exports.adminCheckListStudentInRoom = async function (req, res) {
    try {
        var queryString = "SELECT id_student , full_name , phone ,course ,status , username , birthday ,cmnd_number FROM `pj-thea`.student s JOIN `pj-thea`.status_student ss ON s.id_student = ss.student JOIN `pj-thea`.room r ON r.id_room = ss.room WHERE r.id_room = "+req.params.id_room+" AND s.status = 1 AND ss.date_out_room IS NULL"
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}


exports.adminCheckByBuildingRoom = async function (req, res) {
    try {
        var queryString = "SELECT * FROM room WHERE (building='"+req.params.building+"' AND name_room='"+req.params.room+"') > 0 ORDER BY (max_student - current_student)"
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}


exports.adminSearchRoom = async (req, res) =>{
    try {
        let queryString = " SELECT * FROM `pj-thea`.room WHERE building LIKE '%"+req.params.text+"%' OR name_room LIKE  '%"+req.params.text+"%'"
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}