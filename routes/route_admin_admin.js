const route = require('express').Router();
const admin_admin = require('../controllers/admin_manage_admin');
const auth = require('../midleware/auth_admin');


route.post('/', auth,admin_admin.addAdminUser)

route.post('/login',admin_admin.adminLogIn)

route.get('/logout',auth, admin_admin.adminLogOut)

module.exports = route;