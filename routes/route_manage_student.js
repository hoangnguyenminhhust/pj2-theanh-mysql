const route = require('express').Router();
const manage_student = require('../controllers/admin_manage_student');



route.get('/add-student/:roomId/:studentId' , manage_student.adminArrangeStudentToRoom)
route.get('/', manage_student.adminListAllStudent)
route.get('/free' , manage_student.adminCheckStudentFree)

route.post('/find-student/:text', manage_student.adminSearchStudentByName)

route.delete('/:id_student', manage_student.adminDeleteStudent)
route.get('/:id_student' , manage_student.adminViewInfoStudent)

module.exports = route;