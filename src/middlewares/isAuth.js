const { decodeToken } = require('../services')

function isAuth (req, res, next) {
  if (!req.headers.authorization) {
    return res.send({
      message: 'Asegurese de enviar un token en los headers'
    })
  }

  const token = req.headers.authorization
  const dataToken = decodeToken(token)
  if (dataToken) {
    req.dataToken = dataToken
    next()
  } else {
    res.send( { message: 'Token Rechazado' } )
  }
}

module.exports = isAuth