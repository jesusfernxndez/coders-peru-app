const { encryptPassword } = require('../services')
const { createToken } = require('../services')
const pool = require('../database')

async function newUser(req, res) {
    const query = await pool.query("SELECT * FROM cp_user_control WHERE dni = ?", [req.body.dni])
    try {
        const verify = query[0].dni
        if (verify) {
            return res.send({
                error: true,
                message: `USUARIO CON DNI N°: ${req.body.dni} YA ESTÁ REGISTRADO`
            })
        }
    } catch (e) {
        const queryuser = await pool.query("SELECT * FROM cp_user_control WHERE username = ?", [req.body.username])
        const verifyuser = queryuser[0]
        const queryemail = await pool.query("SELECT * FROM cp_user_control WHERE correo = ?", [req.body.correo])
        const verifyemail = queryemail[0]
        if (verifyuser) {
          return res.send({
            error: true,
            message: `NOMBRE DE USUARIO : ${req.body.username} YA ESTÁ REGISTRADO`
          })
        } else if (verifyemail){
          return res.send({
            error: true,
            message: `CORREO : ${req.body.correo} YA ESTÁ REGISTRADO`
          })
        } else {
            const newUser = {
                dni: req.body.dni,
                fullname: req.body.fullname,
                correo: req.body.correo,
                pais: req.body.pais,
                puesto_actual: req.body.puesto_actual,
                empresa: req.body.empresa,
                username: req.body.username,
                password: await encryptPassword(req.body.password)
            }
            await pool.query("INSERT INTO cp_user_control SET ?", [newUser])
            return res.send({
                status: 'registrado',
                message: `USUARIO CON DNI N°: ${req.body.dni} REGISTRADO CORRECTAMENTE`,
                token: await createToken(newUser)
            })
        }
    }
}

async function UpdateUser(req, res) {
    await pool.query('UPDATE cp_user_control SET ? WHERE dni = ?', [req.body, req.headers.dni])
    res.send({ update: true, message: 'Datos de usuario actualizados' })
}

async function UpdateAdmin(req, res) {
    await pool.query('UPDATE cp_admin_control SET ? WHERE dni = ?', [req.body, req.headers.dni])
    res.send({ update: true, message: 'Datos de Administrador actualizados'})
}

module.exports = {
    newUser,
    UpdateUser,
    UpdateAdmin
}