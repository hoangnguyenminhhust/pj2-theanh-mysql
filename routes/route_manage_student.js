const route = require('express').Router();
const manage_student = require('../controllers/admin_manage_student');
const auth = require('../midleware/auth_admin')


route.get('/add-student/:roomId/:studentId' ,auth, manage_student.adminArrangeStudentToRoom)
route.get('/',auth, manage_student.adminListAllStudent)
route.get('/free' ,auth, manage_student.adminCheckStudentFree)

route.post('/find-student/:text',auth, manage_student.adminSearchStudentByName)

route.delete('/:id_student',auth, manage_student.adminDeleteStudent)
route.get('/:id_student' , auth,manage_student.adminViewInfoStudent)
route.get('/kick/:id_student',manage_student.adminKickStudent)
route.put('/:id_student' ,auth, manage_student.adminUpdateStudent)

module.exports = route;