const express = require('express')
const { newUser, UpdateUser, UpdateAdmin } = require('../controllers/cp_control_user')
const isAuth = require('../middlewares/isAuth')
const router = express.Router()

router.post('/user/registro', newUser)
router.put('/user/profileupdate', isAuth, UpdateUser)
router.put('/admin/profileupdate', isAuth, UpdateAdmin)

module.exports = router