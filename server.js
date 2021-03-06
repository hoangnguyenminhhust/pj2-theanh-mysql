/*
        @Context route : role_function
        @Context
*/
const express = require('express');
const util = require('util');

const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const mysql = require('mysql');
const cors = require('cors');



const route_manage_student = require('./routes/route_manage_student');
const route_admin_admin = require('./routes/route_admin_admin');
const route_student_student = require('./routes/route_student_student');
const route_manage_room = require('./routes/route_manage_room');
const route_admin_fee = require('./routes/route_admin_fee')

dotenv.config();

const con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASS
})
con.connect(function (err) {
  if (err) {
    console.log(err);
    return err
  }
  console.log("Connected!");
});

app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(express.static('public'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use('/student_student', route_student_student);

app.use('/admin_room', route_manage_room);

app.use('/admin_student', route_manage_student);

app.use('/admin_admin', route_admin_admin);

app.use('/admin_fee', route_admin_fee);


app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  else console.log('RestFul API Start on ', process.env.PORT);
});