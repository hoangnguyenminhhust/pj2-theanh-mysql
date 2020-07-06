const {
    success,
    errors
} = require('../response/response')
const query = require('../config/mysql_query_async')
const {
    convert
} = require('../helper/convert_object')

exports.adminCreateFee = async function (req, res) {
    try {
        let totalDay = 0;

        let queryStringRoom = "SELECT room_price FROM room WHERE id_room= " + req.body.id_room + ";"
        const result = await query(queryStringRoom)
        const data = await convert(result)

        const start = new Date(req.body.start)
        const end = new Date(req.body.end)

        const totalPrice = req.body.price + data[0].room_price

        let queryStringStudent = "SELECT student,date_valid_room, date_out_room FROM `pj-thea`.status_student ss JOIN room ON room.id_room = ss.room WHERE date_valid_room BETWEEN '" + req.body.start + "' AND '" + req.body.end + "' AND id_room = " + req.body.id_room + ";"
        const result2 = await query(queryStringStudent)
        const data2 = await convert(result2)
        data2.forEach(e => {
            const inr = new Date(e.date_valid_room)
            if (e.date_out_room === null) {
                if (inr - start > 0) {
                    const time1 = (end - inr)
                    totalDay += time1
                } else {
                    const time2 = (end - start)
                    totalDay += time2
                }
            } else {
                const out = new Date(e.date_out_room)
                if (inr - start > 0) {
                    const time3 = (out - inr)
                    totalDay += time3
                } else {
                    const time4 = (out - inr)
                    totalDay += time4
                }
            }
        })
        totalDay = totalDay / 60 / 60 / 24 / 1000
        data2.forEach(async e => {
            const inr = new Date(e.date_valid_room)
            const pricePerDay = totalPrice / totalDay
            let Ttime = 0
            if (e.date_out_room === null) {
                if (inr - start > 0) {
                    Ttime += (end - inr) / 60 / 60 / 24 / 1000
                } else {
                    Ttime += (end - start) / 60 / 60 / 24 / 1000
                }
            } else {
                const out = new Date(e.date_out_room)
                if (inr - start > 0) {
                    Ttime += (out - inr) / 60 / 60 / 24 / 1000
                } else {
                    Ttime += (out - inr) / 60 / 60 / 24 / 1000
                }
            }
            let queryString = "INSERT INTO `pj-thea`.fee (`date`,price_fee,payment_status,student) VALUES ('2020-05-12'," + Ttime * pricePerDay + ",0," + e.student + ");"
            await query(queryString)
        })


        return success(res, "ok")
    } catch (error) {
        return errors(res, error)

    }

}

exports.adminFindFeeNotYetPayment = async (req, res) => {
    try {
        let queryString = "SELECT * FROM fee WHERE payment_status = 0"
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}




exports.adminViewHistoryPayment = async (req, res) => {

    try {
        let queryString = "SELECT full_name ,date , date_valid_room, date_out_room, date_payment, price_fee FROM student JOIN fee ON fee.student = student.id_student JOIN status_student ON student.id_student = status_student.student WHERE id_student = "+req.params.id_student+""
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}


exports.adminDeleteFee = async (req, res) => {
    try {
        let queryString  = "DELETE FROM fee WHERE id_fee = " +req.params.id_fee+";"
        await query(queryString)
        return success(res, "ok")
    } catch (error) {
        return errors(res, error)
    }
}

exports.adminUpdateFee = async (req, res) => {

    try {
        var queryString = "UPDATE fee SET date='" + req.body.date +
        "',price_fee=" + req.body.price_fee +
        " WHERE id_fee=" + req.params.id_fee + ";"
        const result = await query(queryString)
        const data = await convert(result)
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}


exports.adminConfirmFee = async (req, res) => {
    try {
        const fullDate = new Date()
            
        const date = fullDate.getUTCDate() + 1
        const year = fullDate.getUTCFullYear()
        const month = fullDate.getMonth()
        const l = `${year}-${month}-${date}`
        let queryString = "UPDATE fee SET payment_status = 1, date_payment='"+l+"' WHERE id_fee = " + req.params.id_fee + ";"
        await query(queryString)
        return success(res, "ok")
    } catch (error) {
        return errors(res, error)
    }
}