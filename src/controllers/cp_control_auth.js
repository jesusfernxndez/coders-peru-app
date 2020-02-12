const { createToken } = require('../services')
const { matchPassword } = require('../services')
const pool = require('../database')

async function signIn(req, res) {
    const { username, password } = req.body
    const query = await pool.query('SELECT * FROM cp_user_control WHERE username = ?',[username])
    if (query.length < 1) {
        res.status(200).send({
            state: 'NO_USERNAME',
            message: `username: ${username} no existe...`
        })
    } else {
        const user = query[0]
        const ValidPassword = await matchPassword(password, user.password)
        if (ValidPassword) {
            res.send({
                token: await createToken(user),
                dataUser: {
                    dni: user.dni,
                    correo: user.correo,
                    pais: user.pais,
                    puesto_actual: user.puesto_actual,
                    empresa: user.empresa,
                    username: user.username,
                    password: password
                }
            })
        } else {
            res.send({
                state: 'ERROR_PASSWORD',
                message: `password incorrecto`
            })
        }
    }
}

async function singinAdmin(req, res) {
    const { username, password } = req.body
    const query = await pool.query('SELECT * FROM cp_user_admin WHERE username = ?',[username])
    if (query.length < 1) {
        res.send({
            state: 'NO_USERNAME',
            message: `username: ${username} no existe...`
        })
    } else {
        const user = query[0]
        const ValidPassword = await matchPassword(password, user.password)
        if (ValidPassword) {
            res.send({
                token: await createToken(user),
                dataUser: {
                    dni: user.dni,
                    correo: user.correo,
                    pais: user.pais,
                    puesto_actual: user.puesto_actual,
                    empresa: user.empresa,
                    username: user.username,
                    password: password
                }
            })
        } else {
            res.send({
                state: 'ERROR_PASSWORD',
                message: `password incorrecto`
            })
        }
    }
}

async function misCompras(req, res) {
    if (!req.dataToken) {
        return res.send({message: 'Token no Encontrado'})
    } else {
        const query = await pool.query(`SELECT * FROM cp_user_control WHERE dni = ?`, [req.headers.dni])
        if (query.length < 1) {
                res.send({message: 'DATA NO ENCONTRADA'})
        } else {
            const querycomprashosting = await pool.query(`SELECT * FROM cp_compras_hosting WHERE dni = ?`, [req.headers.dni])
            const querycomprassitios = await pool.query(`SELECT * FROM cp_compras_sitios WHERE dni = ?`, [req.headers.dni])
            const response = {
                message: '',
                comprashosting: Array,
                comprassitios: Array
            }
            if (querycomprashosting.length < 1 && querycomprassitios.length < 1) {
                response.message = "No hemos encontrado compras registradas !!!"
                response.comprashosting = false
                response.comprassitios = false
                res.send(response)
            } else {
                if (querycomprashosting.length > 0 && querycomprassitios.length > 0) {
                    response.message = "compras de hosting y sitios encontradas"
                    response.comprashosting = querycomprashosting
                    response.comprassitios = querycomprassitios
                    res.send(response)
                } else if (querycomprashosting.length > 0 && querycomprassitios.length < 1) {
                    response.message = "compras de hosting encontradas"
                    response.comprassitios = false
                    response.comprashosting = querycomprashosting
                    res.send(response)
                } else if (querycomprassitios.length > 0 && querycomprashosting.length < 1) {
                    response.message = "compras de sitios encontrados"
                    response.comprashosting = false
                    response.comprassitios = querycomprassitios
                    res.send(response)
                }
            }
        }      
    }
}

module.exports= {
    signIn,
    singinAdmin,
    misCompras
}