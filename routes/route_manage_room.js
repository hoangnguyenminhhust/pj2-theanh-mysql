const route = require('express').Router();
const manage_room = require('../controllers/admin_manage_room');

route.get('/', manage_room.adminListAllRoom)
route.get('/:id_room', manage_room.adminViewInfoRoom)
route.put('/:id_room', manage_room.adminUpdateRoom)
route.delete('/:id_room', manage_room.adminDeleteRoom)
route.post('/' , manage_room.adminCreateRoom)
module.exports = route;