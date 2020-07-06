const route = require('express').Router();
const manage_fee = require('../controllers/admin_manage_fee');
const auth = require('../midleware/auth_admin')


route.post('/' , auth, manage_fee.adminCreateFee)
route.get('/not-payment', auth, manage_fee.adminFindFeeNotYetPayment)
route.get('/history/:id_student' , auth, manage_fee.adminViewHistoryPayment)
route.delete('/:id_fee', auth, manage_fee.adminDeleteFee)
route.put('/:id_fee', auth, manage_fee.adminUpdateFee)
route.put('/confirm_fee/:id_fee', auth, manage_fee.adminConfirmFee)

module.exports = route;