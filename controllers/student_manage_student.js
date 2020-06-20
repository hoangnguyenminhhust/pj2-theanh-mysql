const {
    success,
    errors
} = require('../response/response')
const query = require('../config/mysql_query_async')
const {
    convert
} = require('../helper/convert_object')
const session = require('express-session')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

exports.studentLogOut = async function (req, res) {
    try {
        await req.session.destroy()
        // res.redirect(`http://${req.get('host')}/homepage_admin`)
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
            req.session.save()
            return success(res, token)
        }
        return success(res, 'CANNOT_FIND_USER')
    } catch (error) {
        return errors(res, error)
    }
}
exports.studentViewInfo = async (req, res) => {
    try {
        let studentData = req.student
        success(res, studentData)
    } catch (error) {
        errors(res, error)
    }
}

exports.studentUpdateInfo = async (req, res) => {
    try {
        let studentData = req.student
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
        console.log(req.body)

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
        // if (req.body.email.split('@')[req.body.email.split('@').length - 1] == 'gmail.com') {
        //     var transporter = nodemailer.createTransport({
        //         service: 'Gmail',
        //         auth: {
        //             user: 'hoangnguyenminh.hust@gmail.com',
        //             pass: '1chapnhandi'
        //         }
        //     })

        //     host = req.get('host')
        //     link = 'http://' + req.get('host') + '/verify/' + data.insertId
        //     mailOptions = {
        //         from: 'hoangnguyenminh.hust@gmail.com',
        //         to: req.body.email,
        //         subject: 'Please confirm your Email account of dormitory HUST',
        //         html: 'Hello,<br> Please Click on the link to verify your email.<br><a href=' + link + '>Click here to verify</a>'
        //     }
        //     transporter.sendMail(mailOptions, (err, info) => {
        //         if (err) res.send(err)
        //         else {
        //             console.log('Email verify' + info.response)
        //         }
        //     })
        // }
        return success(res, data)
    } catch (error) {
        return errors(res, error)
    }
}