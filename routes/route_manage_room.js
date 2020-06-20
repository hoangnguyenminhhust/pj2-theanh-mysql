const route = require('express').Router();
const manage_room = require('../controllers/admin_manage_room');

route.get('/', manage_room.adminListAllRoom)
route.post('/' , manage_room.adminCreateRoom)
route.get('/room/:id_room', manage_room.adminViewInfoRoom)
route.get('/check-by-building/:building', manage_room.adminCheckByBuilding)
route.get('/check-by-free', manage_room.adminCheckRoomFree)

route.put('/room/:id_room', manage_room.adminUpdateRoom)
route.delete('/room/:id_room', manage_room.adminDeleteRoom)
module.exports = route;