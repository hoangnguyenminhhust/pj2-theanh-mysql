const route = require('express').Router();
const manage_student = require('../controllers/admin_manage_student');
route.get('/:roomId/:studentId' , manage_student.adminArrangeStudentToRoom)
route.get('/', manage_student.adminListAllStudent)
route.get('/free' , manage_student.adminCheckStudentFree)
module.exports = route;