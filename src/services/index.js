const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secret } = require('../config')

async function encryptPassword(password) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

async function matchPassword(password, savedPassword) {
    try {
        return await bcrypt.compare(password, savedPassword)
    } catch (error) {
        console.error(error)
    }
}
function createToken(user) {
    try {
        const payload = {
            user: user
        }
        return token = jwt.sign(payload, secret)
    } catch (error) {
        console.error(error)
    }
}

function decodeToken(token) {
    try {
        const decoded = jwt.verify(token, secret)
        const userdata = decoded.user
        return userdata
    } catch (error) {
        return false
    }
}


module.exports = {
    encryptPassword,
    matchPassword,
    createToken,
    decodeToken
}