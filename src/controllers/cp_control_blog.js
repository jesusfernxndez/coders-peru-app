const pool = require('../database')

async function showComentarios(req, res) {
    const query = await pool.query("SELECT * FROM cp_comentarios ORDER BY id DESC")
    res.send(query)
}
async function showNoticias(req, res) {
    const query = await pool.query("SELECT * FROM cp_noticias ORDER BY id DESC")
    res.send(query)
}
async function showTutoriales(req, res) {
    const query = await pool.query("SELECT * FROM cp_tutoriales ORDER BY id DESC")
    res.send(query)
}
async function showEventos(req, res) {
    const query = await pool.query("SELECT * FROM cp_eventos ORDER BY id DESC")
    res.send(query)
}
async function newComentario(req, res) {
    await pool.query("INSERT INTO cp_comentarios SET ?", [req.body])
    return res.send({
        message: 'Comentario publicado :)'
    })
}
async function newNoticia(req, res) {
    await pool.query("INSERT INTO cp_noticias SET ?", [req.body])
    return res.send({
        message: 'Noticia publicada :)'
    })
}
async function newTutorial(req, res) {
    await pool.query("INSERT INTO cp_tutoriales SET ?", [req.body])
    return res.send({
        message: 'Tutorial publicado :)'
    })
}
async function newEvento(req, res) {
    await pool.query("INSERT INTO cp_eventos SET ?", [req.body])
    return res.send({
        message: 'Evento agregado :)'
    })
}

module.exports = {
    showComentarios,
    showNoticias,
    showTutoriales,
    showEventos,
    newComentario,
    newNoticia,
    newTutorial,
    newEvento
}