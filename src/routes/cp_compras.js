const express = require('express')
const { newCompraHosting, newCompraSitio } = require('../controllers/cp_control_compras')
const isAuth = require('../middlewares/isAuth')
const router = express.Router()

router.post('/newCompraPlantHosting', isAuth, newCompraHosting)
router.post('/newCompraSitioWeb', isAuth, newCompraSitio)

module.exports = router