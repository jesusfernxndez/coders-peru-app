const pool = require('../database')

async function showPlanesHosting(req, res) {
    const query = await pool.query("SELECT * FROM cp_hosting")
    res.send(query)
}
async function showPortafolioWeb(req, res) {
    const query = await pool.query("SELECT * FROM cp_sitios_web")
    res.send(query)
}

module.exports = {
    showPlanesHosting,
    showPortafolioWeb
}