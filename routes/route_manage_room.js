const route = require('express').Router();
const manage_room = require('../controllers/admin_manage_room');
const auth = require('../midleware/auth_admin')
route.get('/',auth, manage_room.adminListAllRoom)
route.post('/' ,auth, manage_room.adminCreateRoom)
route.get('/room/:id_room',auth, manage_room.adminViewInfoRoom)
route.get('/check-by-building/:building',auth, manage_room.adminCheckByBuilding)
route.get('/check-by-building-room/:building/:room',auth, manage_room.adminCheckByBuildingRoom)

route.get('/check-by-free',auth, manage_room.adminCheckRoomFree)
route.get('/check-by-fail',auth, manage_room.adminListAllRoomFail)

route.get('/find-room/:text',auth, manage_room.adminSearchRoom)

route.get('/get-list-student/:id_room',auth, manage_room.adminCheckListStudentInRoom)
route.put('/room/:id_room',auth, manage_room.adminUpdateRoom)
route.delete('/room/:id_room',auth, manage_room.adminDeleteRoom)
module.exports = route;