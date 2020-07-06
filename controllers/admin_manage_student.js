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
            "',cmnd_number='" + req.body.cmnd_number +
            "',status='" + req.body.status +
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

exports.adminSearchStudentByName = async (req, res) => {
    try {
        let queryString = "SELECT * FROM `pj-thea`.student s WHERE full_name LIKE '%"+req.params.text+"%'"
        const result = await query(queryString)
        const data = await convert(result)
        data.forEach((e)=> {
            const fullDate = new Date(e.birthday)
            
            const date = fullDate.getUTCDate()
            const year = fullDate.getUTCFullYear()
            const month = fullDate.getMonth() +1 
            const l = `${year}-${month}-${date}`
            e.birthday = l
        })
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
        data.forEach((e)=> {
            const fullDate = new Date(e.birthday)
            
            const date = fullDate.getUTCDate()
            const year = fullDate.getUTCFullYear()
            const month = fullDate.getMonth() +1 
            const l = `${year}-${month}-${date}`
            e.birthday = l
        })
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}


exports.adminArrangeStudentToRoom = async (req, res) => {
    try {
        fullDate = new Date()
        const date = fullDate.getDate()
        const year = fullDate.getFullYear()
        const month = fullDate.getMonth()
        const l = `${year}-${month}-${date}`
        let queryString = "INSERT INTO status_student (student,room,date_valid_room) VALUES (" +
            req.params.studentId + "," +
            req.params.roomId + ",'" +
            l + "');"
        const queryString2 = "UPDATE student SET status=1 WHERE id_student="+req.params.studentId+";"

        const queryString3 = "UPDATE room SET current_student=current_student+1  WHERE id_room="+req.params.roomId+";"

        await query(queryString2)
        await query(queryString3)
        await query(queryString)
        return success(res, "ok")
    } catch (error) {

        return errors(res, error)
    }
}
exports.adminCheckStudentFree = async function (req, res) {
    try {
        var queryString = "SELECT * FROM student WHERE (status=0)"
        const result = await query(queryString)
        const data = await convert(result)
        data.forEach((e)=> {
            const fullDate = new Date(e.birthday)
            
            const date = fullDate.getUTCDate()
            const year = fullDate.getUTCFullYear()
            const month = fullDate.getMonth() +1 
            const l = `${year}-${month}-${date}`
            e.birthday = l
        })
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}
exports.adminDeleteStudent = async (req, res) => {
    try {
 
        let queryString = "SELECT id_status FROM status_student JOIN student ON student.id_student = status_student.student WHERE id_student ="+req.params.id_student+""
        const result = await query(queryString)
        const data = await convert(result)

        data.forEach(async e => {
            let queryString2 = "DELETE FROM status_student WHERE id_status=" + e.id_status + ";"
            await query(queryString2)
        })

         
        let queryString3 = "SELECT id_fee FROM fee JOIN student ON student.id_student = fee.student WHERE id_student ="+req.params.id_student+""
        const result3 = await query(queryString3)
        const data3 = await convert(result3)

        data3.forEach(async e => {
            let queryString4 = "DELETE FROM fee WHERE id_fee=" + e.id_fee + ";"
            await query(queryString4)
        })

        let queryString5 = "DELETE FROM student WHERE id_student = " + req.params.id_student + ";"
        await query(queryString5)
        return success(res, "ok")
    } catch (error) {
        return errors(res, error)
    }
}


exports.adminKickStudent= async (req, res) => {


    try {
        
    } catch (error) {
        
    }
}


