const express = require('express')
const { signIn, singinAdmin, misCompras } = require('../controllers/cp_control_auth')
const isAuth = require('../middlewares/isAuth')
const router = express.Router()

router.post('/signin', signIn)
router.post('/signin/admin', singinAdmin)
router.get('/misCompras', isAuth, misCompras)

module.exports = router