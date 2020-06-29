const auth = require('../midleware/auth_student');
const route = require('express').Router();
const student_student = require('../controllers/student_manage_student');

route.post('/login', student_student.studentLogIn)

route.post('/signup', student_student.studentSignup)

route.get('/logout', student_student.studentLogOut)

route.get('/', auth, student_student.studentViewInfo)

route.put('/', auth, student_student.studentUpdateInfo)



module.exports = route;