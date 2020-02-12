const express = require('express')
const { 
    showComentarios, 
    showNoticias, 
    showTutoriales,
    showEventos,
    newComentario, 
    newNoticia,
    newTutorial,
    newEvento } = require('../controllers/cp_control_blog')
const isAuth = require('../middlewares/isAuth')
const router = express.Router()

router.get('/showComentarios', showComentarios)
router.get('/showNoticias', showNoticias)
router.get('/showTutoriales', showTutoriales)
router.get('/showEventos', showEventos)

router.post('/newComentario', isAuth, newComentario)
router.post('/newNoticia', isAuth, newNoticia)
router.post('/newTutorial', isAuth, newTutorial)
router.post('/newEvento', isAuth, newEvento)

module.exports = router