const express = require('express')
const { showPlanesHosting, showPortafolioWeb} = require('../controllers/cp_control_tienda')
const router = express.Router()

router.get('/showPlanesHosting', showPlanesHosting)
router.get('/showPortafolioWeb', showPortafolioWeb)

module.exports = router