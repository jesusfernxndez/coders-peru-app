const pool = require('../database')

async function newCompraHosting(req, res) {
    await pool.query("INSERT INTO cp_compras_hosting SET ?", [req.body])
    return res.send({
        success: true,
        message: 'Compra Realizada Exitosamente - Puede ver el resumen de la compra en su perfil :)'
    })
}
async function newCompraSitio(req, res) {
    await pool.query("INSERT INTO cp_compras_sitios SET ?", [req.body])
    return res.send({
        success: true,
        message: 'Compra Realizada Exitosamente - Puede ver el resumen de la compra en su perfil :)'
    })
}

module.exports= {
    newCompraHosting,
    newCompraSitio
}