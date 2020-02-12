const express = require('express')
const { showUsuarios, showVentasHosting, showVentasSitios, deleteUsuario, deleteVentaHosting, deleteVentaSitio } = require('../controllers/cp_control_admin')
const isAuth = require('../middlewares/isAuth')
const router = express.Router()

router.get('/showUsuarios', showUsuarios)
router.get('/showVentasHosting', showVentasHosting)
router.get('/showVentasSitios', showVentasSitios)
router.delete('/deleteUsuario/:dni', deleteUsuario)
router.delete('/deleteVentaHosting/:id', deleteVentaHosting)
router.delete('/deleteVentaSitio/:id', deleteVentaSitio)

module.exports = router