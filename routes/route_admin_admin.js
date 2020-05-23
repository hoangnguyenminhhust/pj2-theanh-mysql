const route = require('express').Router();
const admin_admin = require('../controllers/admin_manage_admin');

route.post('/', admin_admin.addAdminUser)

route.post('/login', admin_admin.adminLogIn)

route.get('/logout', admin_admin.adminLogOut)

module.exports = route;