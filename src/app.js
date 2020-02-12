const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(morgan('dev'));
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", require('./routes/cp_user'))
app.use("/api", require('./routes/cp_auth'))
app.use("/api", require('./routes/cp_blog'))
app.use("/api", require('./routes/cp_contact'))
app.use("/api", require('./routes/cp_tienda'))
app.use("/api", require('./routes/cp_compras'))
app.use("/api", require('./routes/cp_admin'))

const history = require('connect-history-api-fallback')
app.use(history())
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app