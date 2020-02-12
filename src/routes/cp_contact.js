const express = require('express')
const { enviarCorreo } = require('../controllers/cp_control_contact')
const router = express.Router()

router.post('/contacto', enviarCorreo)

module.exports = router