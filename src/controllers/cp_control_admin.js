const { encryptPassword } = require('../services')
const { createToken } = require('../services')
const pool = require('../database')

async function showUsuarios(req, res) {
    const query = await pool.query("SELECT * FROM cp_user_control")
    return res.send(query)
}

async function showVentasHosting(req, res) {
    const query = await pool.query("SELECT * FROM cp_compras_hosting")
    return res.send(query)
}

async function showVentasSitios(req, res) {
    const query = await pool.query("SELECT * FROM cp_compras_sitios")
    return res.send(query)
}

async function deleteUsuario(req, res) {
    await pool.query("DELETE FROM cp_user_control WHERE dni = ?", [req.params.dni])
    return res.send({
        message: 'Eliminado Correctamente'
    })
}

async function deleteVentaHosting(req, res) {
    await pool.query("DELETE FROM cp_compras_hosting WHERE id = ?", [req.params.id])
    return res.send({
        message: 'Eliminado Correctamente'
    })
}

async function deleteVentaSitio(req, res) {
    await pool.query("DELETE FROM cp_compras_sitios WHERE id = ?", [req.params.id])
    return res.send({
        message: 'Eliminado Correctamente'
    })
}


module.exports = {
    showUsuarios,
    showVentasHosting,
    showVentasSitios,
    deleteUsuario,
    deleteVentaHosting,
    deleteVentaSitio
}